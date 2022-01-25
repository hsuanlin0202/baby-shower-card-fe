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
      token: "",
      setUser: (user) => set(user),
      setToken: (token, expiresIn) =>
        set({ token: token, expiresIn: expiresIn }),
      logout: () =>
        set({
          role: 0,
          id: 0,
          username: "",
          email: "",
          expiresIn: 0,
          token: "",
        }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
