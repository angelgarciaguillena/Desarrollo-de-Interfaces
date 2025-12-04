import { createContext } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  userName: string | null;
  loginUser: (name: string) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userName: null,
  loginUser: () => {},
  logoutUser: () => {}
});