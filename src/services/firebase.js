import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);

export function writeCodeData(code,name) {
  const db = database;
  set(ref(db, "codigos/"+code), {
    code:code
  });
}
// export function deleteTaskData(userId, id) {
//   const db = database;
//   remove(ref(db, `tasks/${userId}/${id}`));
// }
export async function getCodeData(code) {
  const db = ref(database);
  const snapshot = await get(child(db, `codigos/${code}`));
  if (snapshot.exists()) {
    let data = snapshot.val();
    return data;
  } else {
    console.log("No data available");
    return null;
  }
}

export const database = getDatabase(app);
