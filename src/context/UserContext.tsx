import React from "react";

type FirebaseUser = {
  kind: string;
  users: [
    {
      localId: string;
      email: string;
      passwordHash: string;
      emailVerified: false;
      passwordUpdatedAt: number;
      providerUserInfo: [
        {
          providerId: string;
          federatedId: string;
          email: string;
          rawId: string;
        }
      ];
      validSince: string;
      lastLoginAt: string;
      createdAt: string;
      lastRefreshAt: string;
    }
  ];
};
type IUserContext = {
  user: null | FirebaseUser;
  setUser: React.Dispatch<React.SetStateAction<null | FirebaseUser>>;
};

const UserContext = React.createContext<null | IUserContext>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) throw new Error("useContext error, Provider");
  return context;
};

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = React.useState<null | FirebaseUser>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
