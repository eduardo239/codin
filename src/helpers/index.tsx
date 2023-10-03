import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { IQuestion, TChallenge, TUser, TUserAnswer } from "./type";
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
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { COLL_ANSWER, COLL_QUESTION } from "./constants";

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
    await signOut(auth);
    window.localStorage.removeItem("user");
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    throw new Error(`${message}`);
  }
};

export const getAllPaginatedDocs = async (
  language: string,
  limit_: number,
  order_?: OrderByDirection | undefined
) => {
  const questionRef = collection(db, COLL_QUESTION);

  const _where: QueryFieldFilterConstraint = where("language", "==", language);
  const _order: QueryOrderByConstraint = orderBy("timestamp", order_);
  const _limit: QueryLimitConstraint = limit(limit_);

  let firstWithWhere = null;
  let firstWithoutWhere = null;
  let docSnapshots = null;
  let docSnapshots2 = null;
  let next = null;

  firstWithWhere = query(questionRef, _where, _order, _limit);
  firstWithoutWhere = query(questionRef, _order, _limit);

  if (language) {
    docSnapshots = await getDocs(firstWithWhere);
  } else {
    docSnapshots = await getDocs(firstWithoutWhere);
  }
  if (!docSnapshots.docs.length) {
    return [];
  }

  const last = docSnapshots.docs[docSnapshots.docs.length - 1];
  if (language) {
    next = query(questionRef, _where, _order, startAt(last), limit(3));
  } else {
    next = query(questionRef, _order, startAt(last), limit(3));
  }

  docSnapshots2 = await getDocs(next);

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

export const getChallenge = async (id: string) => {
  const docRef = doc(db, COLL_QUESTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getCountDocs = async () => {
  const questionRef = collection(db, COLL_QUESTION);
  const snapshot = await getCountFromServer(questionRef);
  return snapshot.data().count;
};

export const handleSubmitChallenge = async (
  challenge: TChallenge,
  alternatives: string[]
) => {
  const queRef = await addDoc(collection(db, COLL_QUESTION), {
    title: challenge.title,
    language: challenge.language,
    code: challenge.code,
    difficulty: +challenge.difficulty,
    alternatives,
    timer: challenge.timer,
    timestamp: challenge.timestamp,
  });
  console.log("Document written with ID: ", queRef.id);

  const ansRef = await addDoc(collection(db, COLL_ANSWER), {
    questionId: queRef.id,
    correct: parseFloat(challenge.correct),
  });
  console.log("Document written with ID: ", ansRef.id);

  return queRef.id;
};

export const handleSubmitAnswer = async (
  id: string,
  selectedOption: string
) => {
  if (selectedOption && id) {
    const q = query(collection(db, COLL_ANSWER), where("questionId", "==", id));
    const querySnapshot = await getDocs(q);

    let isCorrect = false;
    querySnapshot.forEach((doc) => {
      isCorrect = parseInt(selectedOption) === doc.data().correct;
    });
    return isCorrect;
  }
  return null;
};

export const handleSaveUserAnswer = async (userAnswer: TUserAnswer) => {
  const queRef = await addDoc(collection(db, "user_answers"), userAnswer);
  return queRef;
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
    await deleteDoc(doc(db, COLL_QUESTION, id));
  } catch (error) {
    console.log(error);
  }
};
