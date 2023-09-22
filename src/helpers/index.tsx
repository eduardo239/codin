import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { IQuestion, TUser } from "./type";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const userRegister = async (user: TUser): Promise<User> => {
  const auth = getAuth();

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    return response.user;
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    throw new Error(`${message}`);
  }
};

export const userLogin = async (user: TUser): Promise<User> => {
  const auth = getAuth();

  try {
    const response = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const u: User = response.user;

    return response.user;
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    throw new Error(`${message}`);
  }
};

export const logoutUser = async () => {
  const auth = getAuth();

  try {
    const response = await signOut(auth);
    window.localStorage.removeItem("user");
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    throw new Error(`${message}`);
  }
};

export const getAllDocs = async (language: string) => {
  let q = null;
  if (language) {
    q = query(collection(db, "question"), where("language", "==", language));
  } else {
    q = query(collection(db, "question"));
  }
  const querySnapshot = await getDocs(q);
  const array: IQuestion[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const dt = {
      id: doc.id,
      difficulty: doc.data().difficulty,
      code: doc.data().code,
      title: doc.data().title,
      language: doc.data().language,
      alternatives: doc.data().alternatives,
    };
    array.push(dt);
  });
  return array;
};
