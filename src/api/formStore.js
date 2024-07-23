import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  submitFormToFirestore,
  getSchedulesFromFirestore,
  deleteScheduleFromFirestore,
} from "./formUtils";

// Função para validar o e-mail
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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
      theme: "light", // Estado do tema
      setFormData: (field, value) => set({ [field]: value }),
      fetchSchedules: async () => {
        try {
          const schedules = await getSchedulesFromFirestore();
          set({ schedules });
        } catch (error) {
          console.error("Erro ao buscar os agendamentos: ", error);
        }
      },
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

          // Validação do e-mail
          if (!isValidEmail(formData.email)) {
            alert("O e-mail do visitante não é válido.");
            return;
          }

          // Verificação de duplicidade
          const existingSchedule = get().schedules.find(
            (schedule) =>
              schedule.visitDate === formData.visitDate &&
              schedule.visitTime === formData.visitTime
          );

          if (existingSchedule) {
            alert("Já existe um agendamento para esta data e hora.");
            return;
          }

          await submitFormToFirestore(formData);
          await get().fetchSchedules(); // Atualiza a lista de agendamentos após o envio do formulário
        } catch (error) {
          console.error("Erro ao enviar o formulário: ", error);
          throw new Error("Erro ao enviar o formulário: " + error.message);
        }
      },
      deleteSchedule: async (scheduleId) => {
        try {
          await deleteScheduleFromFirestore(scheduleId);
          await get().fetchSchedules(); // Atualiza a lista de agendamentos após a exclusão
        } catch (error) {
          console.error("Erro ao excluir o agendamento: ", error);
          throw new Error("Erro ao excluir o agendamento: " + error.message);
        }
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          document.documentElement.classList.remove(state.theme);
          document.documentElement.classList.add(newTheme);
          return { theme: newTheme };
        });
      },
    }),
    {
      name: "form-storage",
      storage: typeof window !== "undefined" ? localStorage : undefined,
    }
  )
);
