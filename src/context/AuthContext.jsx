import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../service/auth";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrCreateProfile = async (userId) => {
    // Coba ambil profile dari tabel
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (existingProfile) return existingProfile;

    // Profile belum ada → panggil RPC function yang bypass RLS
    const { data: userData } = await supabase.auth.getUser();
    const fullName = userData?.user?.user_metadata?.full_name || "";

    const { data: newProfile, error: rpcError } = await supabase.rpc(
      "create_profile_manual",
      {
        user_id: userId,
        user_full_name: fullName,
      }
    );

    if (rpcError) {
      console.error("Gagal buat profile via RPC:", rpcError);
      // Fallback: coba insert langsung (kalau RLS mengizinkan)
      const { data: fallbackProfile } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            full_name: fullName,
            role: "member",
            points: 0,
            tier: "bronze",
          },
        ])
        .select()
        .single();

      return fallbackProfile || null;
    }

    return newProfile?.[0] || null;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          const prof = await fetchOrCreateProfile(currentUser.id);
          setProfile(prof);
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();

    const sub = authService.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        const u = session?.user;
        setUser(u);
        if (u) {
          const prof = await fetchOrCreateProfile(u.id);
          setProfile(prof);
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      }
    });

    return () => sub.data.subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      const prof = await fetchOrCreateProfile(user.id);
      setProfile(prof);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}