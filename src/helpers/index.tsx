import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { TUser } from "./type";

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
