import { create } from "zustand";
import api from "@/lib/axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersStoreInterface {
  users: User[];
  fetchUsers: () => Promise<void>;
}

const useUsersStore = create<UsersStoreInterface>((set) => ({
  users: [],

  fetchUsers: async () => {
    try {
      const response = await api.get("/users");
      set({ users: response.data });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  },
}));

export default useUsersStore;
