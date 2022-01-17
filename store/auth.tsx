import { UserTypes } from "types";
import create from "zustand";
import { persist } from "zustand/middleware";

type AuthState = UserTypes & {
  token: string;
  expiresIn: number;
  setUser: (user: UserTypes) => void;
  setToken: (token: string, expiresIn: number) => void;
  logout: () => void;
};

export const AuthStore = create<AuthState>(
  persist(
    (set) => ({
      role: 0,
      id: 0,
      username: "",
      email: "",
      expiresIn: 0,
      setUser: (user) => set(user),
      token: "",
      setToken: (token, expiresIn) =>
        set({ token: token, expiresIn: expiresIn }),
      logout: () => set({ token: "", id: 0, role: 0, username: "", email: "" }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
