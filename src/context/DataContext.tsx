import React from "react";
import { getAllDocs } from "../helpers";
import { TMessage } from "../helpers/type";

type TData = {
  message: TMessage | null;
  setMessage: React.Dispatch<React.SetStateAction<TMessage | null>>;
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

  const handleMessage = (
    message: string,
    type: "error" | "warning" | "info" | "success"
  ): void => {
    setMessage({
      message,
      type,
    });
  };

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <DataContext.Provider
      value={{
        message,
        setMessage,
        handleMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
