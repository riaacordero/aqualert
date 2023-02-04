import { User as FirebaseUser } from "firebase/auth";
import { createContext, useContext } from "react";

interface User {
    rawUser: FirebaseUser,
    rawMetadata: Record<string, any>
}

interface AuthContextData {
    user: User
    signin: (newUser: { email: string, password: string }) => Promise<User>
    signout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData>(null!);
export const useAuth = () => useContext(AuthContext);