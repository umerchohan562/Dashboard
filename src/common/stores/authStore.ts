import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;  
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>; // new
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      user: null,

      // Login function
      login: async (email, password) => {
        try {
          const res = await api.post("/auth/login", { email, password });
          const token = res.data.token;
          const user = res.data.user;

          localStorage.setItem("token", token);

          set({ token, isAuthenticated: true, user });
        } catch (err: any) {
          console.error(err);
          throw new Error(err.response?.data?.message || "Login failed");
        }
      },

      // Signup function
      signup: async (name, email, password) => {
        try {
          const res = await api.post("/auth/signup", { name, email, password });
          const token = res.data.token;
          const user = res.data.user;

          // Save token
          localStorage.setItem("token", token);

          // Set auth state
          set({ token, isAuthenticated: true, user });
        } catch (err: any) {
          console.error(err);
          throw new Error(err.response?.data?.message || "Signup failed");
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ token: null, isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
