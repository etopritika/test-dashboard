import { User } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  users: User[];
  currentUser: User | null;
  register: (
    name: string,
    email: string,
    password: string
  ) => { success: boolean; message: string; user: User | null };
  login: (
    email: string,
    password: string
  ) => { success: boolean; message: string; user: User | null };
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,

      register: (name, email, password) => {
        const users = get().users;
        const isExistingUser = users.some((user) => user.email === email);

        if (isExistingUser) {
          return {
            success: false,
            message: "A user with this email already exists!",
            user: null,
          };
        }

        const newUser: User = { name, email, password };
        set({ users: [...users, newUser], currentUser: newUser });

        return {
          success: true,
          message: "User successfully registered!",
          user: newUser,
        };
      },

      login: (email, password) => {
        const users = get().users;
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          set({ currentUser: user });
          return { success: true, message: "Login successful!", user };
        }

        return {
          success: false,
          message: "Invalid email or password.",
          user: null,
        };
      },

      logout: () => {
        set({ currentUser: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser,
      }),
    }
  )
);

export default useAuthStore;
