import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { IQuestion, TChallenge, TUser } from "./type";
import {
  OrderByDirection,
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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

export const getAllDocs = async (
  language: string,
  order: OrderByDirection | undefined,
  limitNumber: number
) => {
  let q = null;
  console.log(order, language);
  const questionRef = collection(db, "question");

  // q = query(questionRef, where("language", "==", language));
  // q = query(questionRef, orderBy("timestamp", order), limit(3));

  //q = query(questionRef, where("language", "==", language), limit(limitNumber));
  q = query(
    questionRef,
    where("language", "==", language),
    orderBy("timestamp", order),
    limit(limitNumber)
  );

  const querySnapshot = await getDocs(q);
  const array: IQuestion[] = [];
  querySnapshot.forEach((doc) => {
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

export const handleSubmitChallenge = async (
  challenge: TChallenge,
  alternatives: string[]
) => {
  const queRef = await addDoc(collection(db, "question"), {
    title: challenge.title,
    language: challenge.language,
    code: challenge.code,
    difficulty: +challenge.difficulty,
    alternatives,
    timer: challenge.timer,
    timestamp: challenge.timestamp,
  });
  console.log("Document written with ID: ", queRef.id);

  const ansRef = await addDoc(collection(db, "answer"), {
    questionId: queRef.id,
    correct: parseFloat(challenge.correct),
  });
  console.log("Document written with ID: ", ansRef.id);
};

export function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();

  // Ensure leading zeros if necessary
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
}
