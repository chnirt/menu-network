import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useLocalStorage } from "react-use";
import { AuthContextType, AuthUser } from "./type";

export enum AuthStatus {
  loading = "loading",
  loaded = "loaded"
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  status: AuthStatus.loading,
  isLoggedIn: false,
  login: () => new Promise((resolve) => resolve(true)),
  logout: () => new Promise((resolve) => resolve(true)),
  setStatus: () => {
    return;
  }
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.loading);
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage(
    "accessToken"
  );
  const isLoggedIn = useMemo(() => !!user, [user]);
  const login = useCallback(
    async (
      callback: () => Promise<{
        username: string;
      }>
    ) => {
      if (typeof callback === "function") {
        try {
          setStatus(AuthStatus.loading);
          const data = await callback();
          if (data.username) {
            setAccessToken(data.username);
            setUser({
              username: data.username
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
          setStatus(AuthStatus.loaded);
        }
      }
      return true;
    },
    [setAccessToken]
  );
  const logout = useCallback(
    async (callback: () => Promise<boolean>) => {
      if (typeof callback === "function") {
        try {
          setStatus(AuthStatus.loading);
          const data = await callback();
          if (data) {
            removeAccessToken();
            setUser(null);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setStatus(AuthStatus.loaded);
        }
      }
      return true;
    },
    [removeAccessToken]
  );

  const fetchProfile = useCallback(async () => {
    try {
      if (accessToken) {
        const username = String(accessToken).split("@")[0];
        const data: { username: string } = await new Promise((resolve) =>
          setTimeout(() => resolve({ username }), 1000)
        );
        if (data) {
          setUser({
            username
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStatus(AuthStatus.loaded);
    }
  }, [accessToken]);

  useEffect(() => {
    if (user === null) {
      void fetchProfile();
    }
  }, [user, fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isLoggedIn,
        login,
        logout,
        setStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
