import React from "react";
import { TMessage } from "../helpers/type";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../helpers/firebase";
import { COLL_QUESTION } from "../helpers/constants";

type TData = {
  message: TMessage | null;
  setMessage: React.Dispatch<React.SetStateAction<TMessage | null>>;
  totalQuestions: number;
  handleMessage: (
    message: string,
    type: "error" | "warning" | "info" | "success"
  ) => void;
};

const DataContext = React.createContext<null | TData>(null);

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context)
    throw new Error("useData deve estar dentro de um DataContext.Provider");
  return context;
};

export const DataProvider = ({ children }: React.PropsWithChildren) => {
  const [message, setMessage] = React.useState<TMessage | null>(null);
  const [totalQuestions, setTotalQuestions] = React.useState(0);

  const handleMessage = (
    message: string,
    type: "error" | "warning" | "info" | "success"
  ): void => {
    setMessage({
      message,
      type,
    });
  };

  const clearMessage = () => {
    setTimeout(() => setMessage(null), 3000);
  };

  const getTotalDocs = async () => {
    const coll = collection(db, COLL_QUESTION);
    const snapshot = await getCountFromServer(coll);
    setTotalQuestions(snapshot.data().count);
  };

  React.useEffect(() => {
    clearMessage();
    return () => {};
  }, [message]);

  React.useEffect(() => {
    getTotalDocs();
    return () => {};
  }, [message]);

  return (
    <DataContext.Provider
      value={{
        message,
        setMessage,
        handleMessage,
        totalQuestions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
