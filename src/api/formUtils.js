// formUtils.js
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const submitFormToFirestore = async (formData) => {
  try {
    await addDoc(collection(db, "schedules"), formData);
  } catch (error) {
    console.error("Erro ao enviar o formulário: ", error);
    throw new Error("Erro ao enviar o formulário: " + error.message);
  }
};

export const fetchSchedulesFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "schedules"));
    const schedules = [];
    querySnapshot.forEach((doc) => {
      schedules.push({ id: doc.id, ...doc.data() });
    });
    return schedules;
  } catch (error) {
    console.error("Erro ao buscar os agendamentos: ", error);
    throw new Error("Erro ao buscar os agendamentos: " + error.message);
  }
};
