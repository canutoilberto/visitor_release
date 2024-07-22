import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firebaseApp } from "@/api/firebaseConfig"; // Certifique-se de que está importando corretamente a inicialização do Firebase

const db = getFirestore(firebaseApp);

export const submitFormToFirestore = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "schedules"), formData);
    console.log("Documento escrito com ID: ", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar documento: ", error);
    throw new Error("Erro ao adicionar documento: " + error.message);
  }
};

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

// Adicione esta função para excluir um documento
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
