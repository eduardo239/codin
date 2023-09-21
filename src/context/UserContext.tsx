import React from "react";

type FirebaseUser = {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: [
    {
      providerId: string;
      uid: string;
      displayName: string | null;
      email: string;
      phoneNumber: null;
      photoURL: string | null;
    }
  ];
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };

  createdAt: number;
  lastLoginAt: number;
  apiKey: string;
  appName: string;
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
