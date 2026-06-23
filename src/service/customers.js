import { supabase } from "../lib/supabase";

export const customerService = {
  async getAll() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, profileData) {
    const { data, error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    // Panggil RPC function yang bypass RLS (hanya admin)
    const { error } = await supabase.rpc("delete_user", {
      target_user_id: id,
    });
    if (error) throw error;
  },
};