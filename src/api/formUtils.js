import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firebaseApp } from "./firebaseConfig";

const db = getFirestore(firebaseApp);

export const addVisitor = async (visitorData) => {
  try {
    const docRef = await addDoc(collection(db, "addedVisitors"), {
      ...visitorData,
      createdAt: serverTimestamp(),
    });
    console.log("Documento criado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar o documento: ", e);
  }
};
