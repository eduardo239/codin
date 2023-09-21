import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { User } from "./type";

export const userRegister = async (user: User) => {
  const auth = getAuth();

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    return response.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} - ${errorMessage}`);
  }
};

export const userLogin = async (user: User) => {
  const auth = getAuth();

  try {
    const response = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    return response.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} - ${errorMessage}`);
  }
};

export const logoutUser = async () => {
  const auth = getAuth();

  try {
    const response = await signOut(auth);
    window.localStorage.removeItem("user");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} - ${errorMessage}`);
  }
};
