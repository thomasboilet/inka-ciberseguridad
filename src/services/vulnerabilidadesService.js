import { db } from "./firebase";
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

const colRef = collection(db, "vulnerabilidades");

export const obtenerVulnerabilidades = async () => {
  const querySnapshot = await getDocs(colRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const obtenerUnaVulnerabilidad = async (id) => {
  const docSnap = await getDoc(doc(db, "vulnerabilidades", id));
  return docSnap.exists() ? { id, ...docSnap.data() } : null;
};

export const agregarVulnerabilidad = async (data) => {
  await addDoc(colRef, data);
};

export const actualizarVulnerabilidad = async (id, data) => {
  await updateDoc(doc(db, "vulnerabilidades", id), data);
};

export const eliminarVulnerabilidad = async (id) => {
  await deleteDoc(doc(db, "vulnerabilidades", id));
};
