import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD6VQEUWKSNPxEMaRb4bU3_ToCxyRkvGKk",
  authDomain: "operatorappbyhulff.firebaseapp.com",
  databaseURL: "https://operatorappbyhulff-default-rtdb.firebaseio.com",
  projectId: "operatorappbyhulff",
  storageBucket: "operatorappbyhulff.appspot.com",
  messagingSenderId: "1052752165670",
  appId: "1:1052752165670:web:602fc6b8b767abff305fe7",
  measurementId: "G-05EPKV2PM3",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function writeCabinsData(code, cabin, action, value) {
  set(ref(database, `cabinsData/${code}/${cabin}/${action}`), {
    value: value,
  });
}
export function writeFullCabinsData(code, obj) {
  set(ref(database, `cabinsData/${code}/`), obj);
}

export function writeCabinsOrder(code, list) {
  set(ref(database, `codes/${code}/cabinOrder`), list);
}
export function writeTableData(code,time,data) {
  let date = new Date()
  set(ref(database, `tabelas/${code}/${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}/${data.horario}`), {
    data:data,
    horarioDeRegistro:time
  });
}

export async function getCodeData(code) {
  const snapshot = await get(child(ref(database), `codes/${code}`));
  if (snapshot.exists()) {
    let data = snapshot.val();
    return data;
  } else {
    console.log("No data available");
    return null;
  }
}
export async function getCabinListData(code) {
  const snapshot = await get(child(ref(database), `cabinsData/${code}`));
  if (snapshot.exists()) {
    let data = snapshot.val();
    return data;
  } else {
    console.log("No data available");
    return null;
  }
}
