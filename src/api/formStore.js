import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  submitFormToFirestore,
  fetchSchedulesFromFirestore,
} from "./formUtils";

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
      schedules: [],
      setFormData: (field, value) => set({ [field]: value }),
      submitForm: async () => {
        try {
          const formData = {
            email: get().email,
            visitorName: get().visitorName,
            visitorContact: get().visitorContact,
            visitDate: get().visitDate,
            visitTime: get().visitTime,
            company: get().company,
            employeeName: get().employeeName,
            hostContact: get().hostContact,
            details: get().details,
          };
          await submitFormToFirestore(formData);
        } catch (error) {
          console.error("Erro ao enviar o formulário: ", error);
          throw new Error("Erro ao enviar o formulário: " + error.message);
        }
      },
      fetchSchedules: async () => {
        try {
          const schedules = await fetchSchedulesFromFirestore();
          set({ schedules });
        } catch (error) {
          console.error("Erro ao buscar os agendamentos: ", error);
        }
      },
    }),
    {
      name: "form-storage",
      storage: typeof window !== "undefined" ? localStorage : undefined,
    }
  )
);
