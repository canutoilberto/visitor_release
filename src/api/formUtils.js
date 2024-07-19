// formUtils.js
import { db } from "./firebaseConfig"; // Certifique-se de que o caminho está correto
import { collection, addDoc } from "firebase/firestore";

export const submitFormToFirestore = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "schedules"), formData);
    console.log("Documento escrito com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
    throw new Error("Erro ao adicionar documento: " + e.message);
  }
};
