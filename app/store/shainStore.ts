// app/store/shainStore.ts
import { create } from "zustand";

type ShainStore = {
  selectedShainCode: string | null;
  setSelectedShainCode: (code: string) => void;
};

export const useShainStore = create<ShainStore>((set) => ({
  selectedShainCode: null,
  setSelectedShainCode: (code) => set({ selectedShainCode: code }),
}));
