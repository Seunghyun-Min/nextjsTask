// app/store/editFormStore.ts
import { create } from "zustand";
import type { EmployeeFormData } from "@/app/lib/definitions";

type EditFormStore = {
  editedShainData: EmployeeFormData | null;
  setEditedShainData: (data: EmployeeFormData) => void;
  clearEditedShainData: () => void;
};

export const useEditFormStore = create<EditFormStore>((set) => ({
  editedShainData: null,
  setEditedShainData: (data) => set({ editedShainData: data }),
  clearEditedShainData: () => set({ editedShainData: null }),
}));
