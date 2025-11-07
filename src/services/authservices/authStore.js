import { create } from "zustand";
import { supabase } from "../../lib/supabaseClient.js";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  init: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      set({
        user: session.user,
        isAuthenticated: true,
        loading: false,
      });
    } else {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
      });
    });

    
  },
     setAuthenticated: (status) => set({ isAuthenticated: status }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },
}));
