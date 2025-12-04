import { useState } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const loginUser = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUserName(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};