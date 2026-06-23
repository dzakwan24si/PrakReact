-- =============================================================
-- SCRIPT SQL LENGKAP - SUPABASE SETUP (FIXED)
-- Project: Sedap Restaurant Admin Dashboard
-- Jalankan PER BAGIAN (blok per blok) di Supabase SQL Editor
-- =============================================================

-- ==================== BAGIAN 1: EKSTENSI ====================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== BAGIAN 2: TABEL ====================

-- 2a. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    points INTEGER NOT NULL DEFAULT 0,
    tier TEXT NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2b. PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2c. ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_amount NUMERIC NOT NULL CHECK (total_amount >= 0),
    discount_applied NUMERIC NOT NULL DEFAULT 0 CHECK (discount_applied >= 0),
    final_amount NUMERIC NOT NULL CHECK (final_amount >= 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2d. ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_time NUMERIC NOT NULL CHECK (price_at_time >= 0)
);

-- ==================== BAGIAN 3: FUNCTIONS & TRIGGERS ====================

-- 3a. RPC Function: Create profile manually (bypass RLS, untuk fallback jika trigger gagal)
CREATE OR REPLACE FUNCTION public.create_profile_manual(
    user_id UUID,
    user_full_name TEXT DEFAULT ''
)
RETURNS SETOF public.profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role, points, tier)
    VALUES (user_id, user_full_name, 'member', 0, 'bronze')
    ON CONFLICT (id) DO NOTHING;
    
    RETURN QUERY SELECT * FROM public.profiles WHERE id = user_id;
END;
$$;

-- 3b. Function: Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role, points, tier)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
        'member',
        0,
        'bronze'
    );
    RETURN NEW;
END;
$$;

-- Trigger: on_auth_user_created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- 3b. Function: Auto-update tier based on points
CREATE OR REPLACE FUNCTION public.update_tier_on_points_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    new_tier TEXT;
BEGIN
    IF NEW.points >= 10000 THEN
        new_tier := 'platinum';
    ELSIF NEW.points >= 5000 THEN
        new_tier := 'gold';
    ELSIF NEW.points >= 1000 THEN
        new_tier := 'silver';
    ELSE
        new_tier := 'bronze';
    END IF;

    NEW.tier := new_tier;
    RETURN NEW;
END;
$$;

-- Trigger: trg_update_tier
DROP TRIGGER IF EXISTS trg_update_tier ON public.profiles;
CREATE TRIGGER trg_update_tier
    BEFORE UPDATE OF points ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_tier_on_points_change();

-- 3c. Function: Calculate discount percentage based on tier
CREATE OR REPLACE FUNCTION public.get_discount_percentage(user_tier TEXT)
RETURNS NUMERIC
LANGUAGE plpgsql
IMMUTABLE
SET search_path = ''
AS $$
BEGIN
    RETURN CASE user_tier
        WHEN 'bronze' THEN 5
        WHEN 'silver' THEN 10
        WHEN 'gold' THEN 15
        WHEN 'platinum' THEN 20
        ELSE 0
    END;
END;
$$;

-- =============================================================
-- BAGIAN 3B: FUNCTIONS UNTUK RLS (bypass infinite recursion)
-- =============================================================

-- Function: Cek apakah user adalah admin (bypass RLS dengan SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
    RETURN user_role = 'admin';
END;
$$;

-- Function: Dapatkan current user ID (helper)
CREATE OR REPLACE FUNCTION public.current_user_id()
RETURNS UUID
LANGUAGE sql
STABLE
SET search_path = ''
AS $$
    SELECT auth.uid();
$$;

-- Function: Hapus profile customer (hanya admin, bypass RLS)
-- Data orders & order_items ikut terhapus via CASCADE
-- Catatan: Auth user tidak bisa dihapus tanpa Service Role Key
CREATE OR REPLACE FUNCTION public.delete_user(target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    caller_role TEXT;
BEGIN
    -- Cek apakah caller adalah admin
    SELECT role INTO caller_role FROM public.profiles WHERE id = auth.uid();
    
    IF caller_role != 'admin' THEN
        RAISE EXCEPTION 'Only admin can delete users';
    END IF;
    
    -- Hapus profile (cascade ke orders, order_items)
    DELETE FROM public.profiles WHERE id = target_user_id;
    
    RETURN TRUE;
END;
$$;

-- ==================== BAGIAN 4: RLS POLICIES (FIXED) ====================

-- 4a. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 4b. PROFILES Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin can update all profiles" ON public.profiles;

CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles"
    ON public.profiles FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin can update all profiles"
    ON public.profiles FOR UPDATE
    USING (public.is_admin());

-- 4c. PRODUCTS Policies
DROP POLICY IF EXISTS "Everyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admin can insert products" ON public.products;
DROP POLICY IF EXISTS "Admin can update products" ON public.products;
DROP POLICY IF EXISTS "Admin can delete products" ON public.products;

CREATE POLICY "Everyone can view products"
    ON public.products FOR SELECT
    USING (true);

CREATE POLICY "Admin can insert products"
    ON public.products FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update products"
    ON public.products FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Admin can delete products"
    ON public.products FOR DELETE
    USING (public.is_admin());

-- 4d. ORDERS Policies
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Admin can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON public.orders;
DROP POLICY IF EXISTS "Admin can update orders" ON public.orders;

CREATE POLICY "Users can view own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all orders"
    ON public.orders FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Users can insert own orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update orders"
    ON public.orders FOR UPDATE
    USING (public.is_admin());

-- 4e. ORDER ITEMS Policies
DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
DROP POLICY IF EXISTS "Admin can view all order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can insert own order items" ON public.order_items;

CREATE POLICY "Users can view own order items"
    ON public.order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE public.orders.id = public.order_items.order_id
            AND public.orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Admin can view all order items"
    ON public.order_items FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Users can insert own order items"
    ON public.order_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE public.orders.id = public.order_items.order_id
            AND public.orders.user_id = auth.uid()
        )
    );

-- =============================================================
-- BAGIAN 5: SEEDER ADMIN (Jalankan setelah register admin)
-- =============================================================
-- Langkah 1: Cari UUID user berdasarkan email:
--    SELECT id, email FROM auth.users WHERE email = 'admin@gmail.com';
-- Langkah 2: Copy UUID dari hasil query, lalu:
--    UPDATE public.profiles SET role = 'admin' WHERE id = 'UUID_YANG_DI_COPY';
-- =============================================================
