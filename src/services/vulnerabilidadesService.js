import { db, storage } from "./firebase";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  getDoc, 
  deleteDoc 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  let evidenciasUrls = [];
  
  if (data.nuevasEvidencias?.length > 0) {
    evidenciasUrls = await Promise.all(
      data.nuevasEvidencias.map(async (file) => {
        const storageRef = ref(storage, `evidencias/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      })
    );
  }

  return addDoc(colRef, {
    nombre: data.nombre,
    tipo: data.tipo,
    riesgo: data.riesgo,
    fechaDeteccion: data.fechaDeteccion,
    descripcion: data.descripcion,
    soluciones: data.soluciones,
    recomendaciones: data.recomendaciones,
    ...(evidenciasUrls.length > 0 && { evidencias: evidenciasUrls })
  });
};

export const actualizarVulnerabilidad = async (id, data) => {
  let evidenciasUrls = data.evidenciasExistentes || [];

  if (data.nuevasEvidencias?.length > 0) {
    const nuevasUrls = await Promise.all(
      data.nuevasEvidencias.map(async (file) => {
        const storageRef = ref(storage, `evidencias/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      })
    );
    evidenciasUrls = [...evidenciasUrls, ...nuevasUrls];
  }

  // Eliminar nuevasEvidencias del objeto antes de actualizar
  const { nuevasEvidencias, evidenciasExistentes, ...resto } = data;

  return updateDoc(doc(db, "vulnerabilidades", id), {
    ...resto,
    evidencias: evidenciasUrls
  });
};


export const eliminarVulnerabilidad = async (id) => {
  await deleteDoc(doc(db, "vulnerabilidades", id));
};