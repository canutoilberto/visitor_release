import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addVisitor } from "./formUtils";

export const useFormStore = create(
  persist(
    (set, get) => ({
      email: "",
      visitorName: "",
      visitorContact: "",
      visitDate: "",
      visitTime: "",
      company: "",
      employeeName: "",
      hostContact: "",
      details: "",
      setFormData: (field, value) =>
        set((state) => ({ ...state, [field]: value })),
      clearFormData: () =>
        set({
          email: "",
          visitorName: "",
          visitorContact: "",
          visitDate: "",
          visitTime: "",
          company: "",
          employeeName: "",
          hostContact: "",
          details: "",
        }),
      submitForm: async () => {
        const state = get();
        const formData = {
          email: state.email,
          visitorName: state.visitorName,
          visitorContact: state.visitorContact,
          visitDate: state.visitDate,
          visitTime: state.visitTime,
          company: state.company,
          employeeName: state.employeeName,
          hostContact: state.hostContact,
          details: state.details,
          timestamp: new Date().toISOString(),
        };
        await addVisitor(formData);
        state.clearFormData();
      },
    }),
    {
      name: "visitor-form",
      getStorage: () => localStorage,
    }
  )
);
