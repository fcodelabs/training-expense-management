import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.React_App_apiKey as string,
  authDomain: process.env.React_App_authDomain as string,
  projectId: process.env.React_App_projectId as string,
  storageBucket: process.env.React_app_storageBucket as string,
  messagingSenderId: process.env.React_App_messagingSenderId as string,
  appId: process.env.React_App_appId as string,
};

//const app = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();
//export const doc = collection(firestore, "userExManagement");
