import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { firebaseApp } from "@/api/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const db = getFirestore(firebaseApp);
const auth = getAuth();

// Funções relacionadas a usuários
export const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Usuário criado com sucesso:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao criar usuário: ", error);
    throw new Error("Erro ao criar usuário: " + error.message);
  }
};

export const addUserToFirestore = async (email, registration) => {
  try {
    const userDocRef = doc(db, "users", email);
    await setDoc(userDocRef, { registration });
    console.log("Usuário adicionado/atualizado com sucesso.");
  } catch (error) {
    console.error("Erro ao adicionar usuário: ", error);
    throw new Error("Erro ao adicionar usuário: " + error.message);
  }
};

export const checkUserExists = async (email) => {
  try {
    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists(); // Verifica se o documento do usuário existe
  } catch (error) {
    console.error("Erro ao verificar a existência do usuário: ", error);
    throw new Error(
      "Erro ao verificar a existência do usuário: " + error.message
    );
  }
};

// Funções relacionadas ao agendamento
export const submitFormToFirestore = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "schedules"), formData);
    console.log("Documento escrito com ID: ", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar documento: ", error);
    throw new Error("Erro ao adicionar documento: " + error.message);
  }
};

// Função para obter agendamentos de um usuário específico
export const getSchedulesFromFirestore = async (userId) => {
  try {
    const q = query(
      collection(db, "schedules"),
      where("userId", "==", userId) // Filtra os agendamentos pelo ID do usuário
    );
    const querySnapshot = await getDocs(q);
    const schedules = [];
    querySnapshot.forEach((doc) => {
      schedules.push({ id: doc.id, ...doc.data() });
    });
    return schedules;
  } catch (error) {
    console.error("Erro ao buscar documentos: ", error);
    throw new Error("Erro ao buscar documentos: " + error.message);
  }
};

export const deleteScheduleFromFirestore = async (scheduleId) => {
  try {
    const docRef = doc(db, "schedules", scheduleId);
    await deleteDoc(docRef);
    console.log("Documento excluído com ID: ", scheduleId);
  } catch (error) {
    console.error("Erro ao excluir documento: ", error);
    throw new Error("Erro ao excluir documento: " + error.message);
  }
};

// Funções relacionadas ao login
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Retorna o usuário autenticado
  } catch (error) {
    console.error("Erro ao fazer login: ", error);
    throw new Error("Erro ao fazer login: " + error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Usuário deslogado com sucesso.");
  } catch (error) {
    console.error("Erro ao fazer logout: ", error);
    throw new Error("Erro ao fazer logout: " + error.message);
  }
};
