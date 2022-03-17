import { UserTypes, VendorTemplateTypes } from "types";
import create from "zustand";
import { persist } from "zustand/middleware";

type AuthState = UserTypes & {
  babyCardId: number;
  setBabyCardId: (id: number) => void;
  token: string;
  expiresIn: number;
  orderTokens: { all: string[]; used: string[] };
  templates: VendorTemplateTypes[];
  setUser: (user: UserTypes) => void;
  setToken: (token: string, expiresIn: number) => void;
  setPartnerData: (data: {
    tokens: string[];
    templates: VendorTemplateTypes[];
  }) => void;
  setOrderUsedTokens: (tokens: string[]) => void;
  logout: () => void;
};

const initUser = {
  role: 0,
  id: 0,
  username: "",
  email: "",
  expiresIn: 0,
  token: "",
  orders: [],
  partners: [],
  templates: [],
  orderTokens: { all: [], used: [] },
  blocked: false,
  babyCardId: 0,
};

export const AuthStore = create<AuthState>(
  persist(
    (set, get) => ({
      ...initUser,
      setUser: (user) => set(user),
      setToken: (token, expiresIn) =>
        set({ token: token, expiresIn: expiresIn }),
      setPartnerData: (data) =>
        set({
          orderTokens: {
            all: data.tokens,
            used: get().orderTokens.used,
          },
          templates: data.templates,
        }),
      setOrderUsedTokens: (tokens) =>
        set({ orderTokens: { all: get().orderTokens.all, used: tokens } }),
      setBabyCardId: (id) => set({ babyCardId: id }),
      logout: () =>
        set({
          ...initUser,
        }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
