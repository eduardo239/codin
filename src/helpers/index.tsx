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
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
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
  language?: string,
  order?: OrderByDirection | undefined,
  limitNumber?: number
) => {
  let q = null;
  const questionRef = collection(db, "question");

  if (language) {
    q = query(
      questionRef,
      where("language", "==", language),
      orderBy("timestamp", order),
      limit(limitNumber ? limitNumber : 10)
    );
  } else {
    q = query(
      questionRef,
      orderBy("timestamp", order),
      limit(limitNumber ? limitNumber : 10)
    );
  }
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

export const getAllPaginatedDocs = async (
  language: string,
  limit_: number,
  order_?: OrderByDirection | undefined
) => {
  const questionRef = collection(db, "question");

  const _where: QueryFieldFilterConstraint = where("language", "==", language);
  const _order: QueryOrderByConstraint = orderBy("timestamp", order_);
  const _limit: QueryLimitConstraint = limit(limit_);

  let firstWithWhere = null;
  let firstWithoutWhere = null;
  let docSnapshots = null;

  firstWithWhere = query(questionRef, _where, _order, _limit);
  firstWithoutWhere = query(questionRef, _order, _limit);

  if (language) {
    docSnapshots = await getDocs(firstWithWhere);
  } else {
    docSnapshots = await getDocs(firstWithoutWhere);
  }

  const last = docSnapshots.docs[docSnapshots.docs.length - 1];
  const next = query(questionRef, _where, _order, startAt(last), limit(3));
  const docSnapshots2 = await getDocs(next);

  const array: IQuestion[] = [];
  docSnapshots2.forEach((doc) => {
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

export const getCountDocs = async () => {
  const questionRef = collection(db, "question");
  const snapshot = await getCountFromServer(questionRef);
  return snapshot.data().count;
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

export const deleteDocById = async (id: string) => {
  try {
    await deleteDoc(doc(db, "question", id));
  } catch (error) {
    console.log(error);
  }
};
