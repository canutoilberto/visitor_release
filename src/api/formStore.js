import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  submitFormToFirestore,
  getSchedulesFromFirestore,
  deleteScheduleFromFirestore,
  checkUserExists,
  addUserToFirestore,
  loginWithEmailAndPassword, // Adicionar a importação aqui se necessário
  logoutUser, // Se você precisar dessa função também
} from "./formUtils";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      user: null, // Estado do usuário
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

          if (!isValidEmail(formData.email)) {
            alert("O e-mail do visitante não é válido.");
            return;
          }

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
          await get().fetchSchedules();
        } catch (error) {
          console.error("Erro ao enviar o formulário: ", error);
          throw new Error("Erro ao enviar o formulário: " + error.message);
        }
      },
      deleteSchedule: async (scheduleId) => {
        try {
          await deleteScheduleFromFirestore(scheduleId);
          await get().fetchSchedules();
        } catch (error) {
          console.error("Erro ao excluir o agendamento: ", error);
          throw new Error("Erro ao excluir o agendamento: " + error.message);
        }
      },
      setUser: (user) => set({ user }), // Função para atualizar o estado do usuário
      listenAuthState: () => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            await addUserToFirestore(user.email, user.uid);
            set({ user: { email: user.email, uid: user.uid } });
          } else {
            set({ user: null });
          }
        });
      },
    }),
    {
      name: "form-storage",
      storage: typeof window !== "undefined" ? localStorage : undefined,
    }
  )
);
