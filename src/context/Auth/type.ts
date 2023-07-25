import { User } from "firebase/auth";
import { AuthStatus } from ".";

export type AuthContextType = {
  user: User | null;
  status: AuthStatus;
  isLoggedIn: boolean;
  login: (
    callback: () => Promise<{
      username: string;
    }>
  ) => Promise<boolean>;
  logout: (callback: () => Promise<boolean>) => Promise<boolean>;
  setStatus: (value: React.SetStateAction<AuthStatus>) => void;
};
