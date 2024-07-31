import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  submitFormToFirestore,
  getSchedulesFromFirestore,
  deleteScheduleFromFirestore,
  createUser as createUserUtil,
  loginWithEmailAndPassword,
  logout,
  addUserToFirestore,
} from "./formUtils";
import {
  getAuth,
  onAuthStateChanged,
  getAuth as getAuthInstance,
} from "firebase/auth";

// Função para validar o e-mail
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para obter o usuário atual
const getCurrentUser = async () => {
  const auth = getAuthInstance();
  const user = auth.currentUser;
  if (user) {
    return { email: user.email, uid: user.uid };
  } else {
    return null;
  }
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
      user: {
        name: "",
        lastname: "",
        matricula: "",
        email: "",
        isAdmin: false,
      }, // Estado do usuário
      loading: false,
      error: null,
      setFormData: (field, value) => set({ [field]: value }),
      fetchSchedules: async () => {
        try {
          const user = get().user;
          if (user && user.uid) {
            const schedules = await getSchedulesFromFirestore(user.uid);
            set({ schedules });
          } else {
            console.error("Usuário não autenticado.");
          }
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
            userId: get().user?.uid, // Adiciona o ID do usuário aos dados do formulário
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
      createUser: async (email, registration, name, lastname) => {
        set({ loading: true, error: null });
        try {
          const user = await createUserUtil(
            email,
            registration,
            name,
            lastname,
            false
          ); // Passa todos os parâmetros
          set({ user: { email: user.email, uid: user.uid, name, lastname } });
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
            await get().fetchSchedules(); // Atualiza os agendamentos quando o usuário faz login
          } else {
            set({ user: null, schedules: [] }); // Limpa os agendamentos quando o usuário faz logout
          }
        });
      },
      getCurrentUser: async () => {
        try {
          const user = await getCurrentUser();
          set({ user });
          return user;
        } catch (error) {
          console.error("Erro ao obter o usuário atual: ", error);
          return null;
        }
      },
    }),
    {
      name: "form-storage", // Use localStorage para persistir o estado
    }
  )
);
