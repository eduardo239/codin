import React from "react";
import { User } from "firebase/auth";

type IUserContext = {
  user: null | User;
  setUser: React.Dispatch<React.SetStateAction<null | User>>;
};

const UserContext = React.createContext<null | IUserContext>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context)
    throw new Error("useUser deve estar dentro de um UserContext.Provider");
  return context;
};

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = React.useState<null | User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
