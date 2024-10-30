// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCi0MYR3lwbk2wPrpBLy9Gu_fuXCoR8Lcc",
  authDomain: "hrbs-2624.firebaseapp.com",
  databaseURL: "https://hrbs-2624-default-rtdb.firebaseio.com",
  projectId: "hrbs-2624",
  storageBucket: "hrbs-2624.appspot.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
