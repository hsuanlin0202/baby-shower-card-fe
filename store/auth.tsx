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

const initUser = {
  role: 0,
  id: 0,
  username: "",
  email: "",
  expiresIn: 0,
  token: "",
};

export const AuthStore = create<AuthState>(
  persist(
    (set) => ({
      ...initUser,
      setUser: (user) => set(user),
      setToken: (token, expiresIn) =>
        set({ token: token, expiresIn: expiresIn }),
      logout: () => set(initUser),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
