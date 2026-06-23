-- =============================================================
-- SEEDER: 10 Menu Makanan Restoran Sedap
-- Jalankan query ini di Supabase SQL Editor
-- =============================================================

INSERT INTO public.products (name, description, price, stock)
VALUES
    ('Nasi Goreng Spesial', 'Nasi goreng dengan telur, ayam suwir, dan kerupuk', 35000, 50),
    ('Mie Goreng Jawa', 'Mie goreng ala Jawa dengan bumbu kecap dan sayuran', 30000, 45),
    ('Ayam Bakar Madu', 'Ayam bakar dengan olesan madu, disajikan dengan sambal dan lalapan', 45000, 30),
    ('Sate Ayam Madura', '10 tusuk sate ayam dengan bumbu kacang khas Madura', 50000, 25),
    ('Rendang Sapi', 'Daging sapi dimasak rendang dengan santan dan rempah pilihan', 55000, 20),
    ('Gado-Gado', 'Sayuran rebus dengan lontong dan siraman bumbu kacang', 28000, 35),
    ('Soto Ayam Lamongan', 'Soto ayam dengan kuah bening, telur, dan koya khas Lamongan', 32000, 40),
    ('Ikan Gurame Bakar', 'Ikan gurame bakar utuh dengan sambal kecap dan lalapan', 65000, 15),
    ('Es Cendol Dawet', 'Minuman es cendol dawet dengan santan dan gula merah', 15000, 60),
    ('Jus Alpukat', 'Jus alpukat segar dengan campuran susu coklat', 18000, 55);

-- Verifikasi hasil
SELECT * FROM public.products ORDER BY created_at DESC;