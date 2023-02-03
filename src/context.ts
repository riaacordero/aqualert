import { User } from "firebase/auth";
import { createContext, useContext } from "react";

interface AuthContextData {
    user: User
    signin: (newUser: { email: string, password: string }) => Promise<User>
    signout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData>(null!);
export const useAuth = () => useContext(AuthContext);