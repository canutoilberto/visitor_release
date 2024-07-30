import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  submitFormToFirestore,
  getSchedulesFromFirestore,
  deleteScheduleFromFirestore,
  createUser,
  loginWithEmailAndPassword,
  logout,
  listenAuthState,
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
      user: null, // Estado do usuário
      loading: false,
      error: null,
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
      createUser: async (email, registration) => {
        set({ loading: true, error: null });
        try {
          const user = await createUser(email, registration);
          set({ user: { email: user.email, uid: user.uid } });
        } catch (error) {
          console.error("Erro ao criar usuário: ", error);
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await loginWithEmailAndPassword(
            email,
            password
          );
          const user = userCredential.user;
          set({ user: { email: user.email, uid: user.uid } });
        } catch (error) {
          console.error("Erro ao fazer login: ", error);
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },
      logout: async () => {
        set({ loading: true, error: null });
        try {
          await logout();
          set({ user: null });
        } catch (error) {
          console.error("Erro ao fazer logout: ", error);
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },
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
      getStorage: () => localStorage, // Use localStorage para persistir o estado
    }
  )
);
