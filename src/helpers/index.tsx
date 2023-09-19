import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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

export const loadUser = async () => {
  const auth = getAuth();
  let u = null;
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) u = user;
    });
    return u;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} - ${errorMessage}`);
  }
};
