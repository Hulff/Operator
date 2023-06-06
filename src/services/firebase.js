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
  measurementId: "G-05EPKV2PM3"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function writeCabinsData(code,n,type,vl) {
  if (type=="snow") {
    set(ref(database, `cabinsData/${code}/${n}`), {
      ac:vl,
    });
  } else if (type=="window") {
    set(ref(database, `cabinsData/${code}/${n}`), {
      window:vl
    });
  }
}
export function writeCabinsOrder(code,list) {
    set(ref(database, `codes/${code}/cabinOrder`), list);
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



