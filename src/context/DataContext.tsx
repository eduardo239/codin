import React from "react";

const DataContext = React.createContext<null>(null);

export const useUser = () => {
  const context = React.useContext(DataContext);
  if (!context) throw new Error("useContext error, Provider");
  return context;
};

export const DataProvider = ({ children }: React.PropsWithChildren) => {
  const [data, setData] = React.useState<null>(null);

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
