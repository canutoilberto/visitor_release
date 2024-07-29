import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firebaseApp } from "@/api/firebaseConfig";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const db = getFirestore(firebaseApp);
const auth = getAuth();

// Função para adicionar ou atualizar um usuário na coleção "users"
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

// Função para verificar se um usuário existe na coleção "users"
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

// Função para adicionar um formulário à coleção "schedules"
export const submitFormToFirestore = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "schedules"), formData);
    console.log("Documento escrito com ID: ", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar documento: ", error);
    throw new Error("Erro ao adicionar documento: " + error.message);
  }
};

// Função para obter os agendamentos da coleção "schedules"
export const getSchedulesFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "schedules"));
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

// Função para excluir um agendamento da coleção "schedules"
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

// Função para login do usuário
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

// Função para logout do usuário
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Usuário deslogado com sucesso.");
  } catch (error) {
    console.error("Erro ao fazer logout: ", error);
    throw new Error("Erro ao fazer logout: " + error.message);
  }
};
