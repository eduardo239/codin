import React from "react";
import { getAllDocs } from "../helpers";

type TData = {
  totalChallenges: number;
  setTotalChallenges: React.Dispatch<React.SetStateAction<number>>;
};

const DataContext = React.createContext<null | TData>(null);

export const useUser = () => {
  const context = React.useContext(DataContext);
  if (!context) throw new Error("useContext error, Provider");
  return context;
};

export const DataProvider = ({ children }: React.PropsWithChildren) => {
  const [totalChallenges, setTotalChallenges] = React.useState<number>(0);

  const getAllQuestions = async () => {
    const response = await getAllDocs("");
    setTotalChallenges(response.length);
  };

  React.useEffect(() => {
    getAllQuestions();
    return () => {};
  }, []);

  console.log(totalChallenges);

  return (
    <DataContext.Provider value={{ totalChallenges, setTotalChallenges }}>
      {children}
    </DataContext.Provider>
  );
};
