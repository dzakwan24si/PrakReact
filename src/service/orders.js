import { supabase } from "../lib/supabase";

// Diskon berdasarkan tier
const DISCOUNT_MAP = {
  bronze: 5,
  silver: 10,
  gold: 15,
  platinum: 20,
};

export const orderService = {
  // Hitung diskon berdasarkan tier
  calculateDiscount(tier, totalAmount) {
    const percent = DISCOUNT_MAP[tier] || 0;
    const discount = Math.round((totalAmount * percent) / 100);
    return {
      discountApplied: discount,
      finalAmount: totalAmount - discount,
      discountPercent: percent,
    };
  },

  // Hitung poin yang didapat (1 poin per Rp 1.000)
  calculatePointsEarned(finalAmount) {
    return Math.floor(finalAmount / 1000);
  },

  // Ambil semua orders (Admin melihat semua, Member melihat milik sendiri)
  async getAll() {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", (await supabase.auth.getUser()).data.user.id)
      .single();

    let query = supabase
      .from("orders")
      .select("*, profiles(full_name), order_items(*, products(*))")
      .order("created_at", { ascending: false });

    if (profile?.role !== "admin") {
      query = query.eq("user_id", (await supabase.auth.getUser()).data.user.id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Buat order baru (untuk member)
  async create(items) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error("User not authenticated");

    // Ambil profile user (tier, points)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (profileError) throw profileError;

    // Ambil detail produk untuk harga terkini
    const productIds = items.map((item) => item.product_id);
    const { data: products, error: prodError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);
    if (prodError) throw prodError;

    // Hitung total
    let totalAmount = 0;
    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.product_id);
      if (!product) throw new Error(`Product ${item.product_id} not found`);
      totalAmount += product.price * item.quantity;
      return {
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_time: product.price,
      };
    });

    // Hitung diskon
    const { discountApplied, finalAmount } = this.calculateDiscount(
      profile.tier,
      totalAmount
    );

    // Buat order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          total_amount: totalAmount,
          discount_applied: discountApplied,
          final_amount: finalAmount,
          status: "pending",
        },
      ])
      .select()
      .single();
    if (orderError) throw orderError;

    // Insert order items
    const itemsWithOrderId = orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    }));
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsWithOrderId);
    if (itemsError) throw itemsError;

    // Update stok produk
    for (const item of items) {
      const product = products.find((p) => p.id === item.product_id);
      const newStock = product.stock - item.quantity;
      await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", item.product_id);
    }

    // Tambah poin member
    const pointsEarned = this.calculatePointsEarned(finalAmount);
    await supabase
      .from("profiles")
      .update({ points: profile.points + pointsEarned })
      .eq("id", user.id);

    return { ...order, points_earned: pointsEarned };
  },

  // Update status order (hanya admin)
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};