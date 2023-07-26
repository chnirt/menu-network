import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "react-use";
import { debounce } from "lodash";
import { User, onAuthStateChanged } from "firebase/auth";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { AuthContextType } from "./type";
import { auth } from "../../firebase";
import { getDocRef, getDocument } from "../../firebase/service";
import { Loading } from "../../global";

export enum AuthStatus {
  loading = "loading",
  loaded = "loaded",
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  status: AuthStatus.loading,
  isLoggedIn: false,
  login: () => new Promise((resolve) => resolve(true)),
  logout: () => new Promise((resolve) => resolve(true)),
  setStatus: () => {
    return;
  },
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<(User & { fullName?: string }) | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.loading);
  const [userDocReference, setUserDocReference] = useState<DocumentReference<
    DocumentData,
    DocumentData
  > | null>(null);
  const [accessToken, setAccessToken, removeAccessToken] =
    useLocalStorage("accessToken");
  const isLoggedIn = useMemo(() => !!user, [user]);
  const login = useCallback(
    async (
      callback: () => Promise<{
        username: string;
      }>
    ) => {
      // if (typeof callback === "function") {
      //   try {
      //     setStatus(AuthStatus.loading);
      //     const data = await callback();
      //     if (data.username) {
      //       setAccessToken(data.username);
      //       setUser({
      //         username: data.username,
      //       });
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   } finally {
      //     setStatus(AuthStatus.loaded);
      //   }
      // }
      return true;
    },
    [setAccessToken]
  );
  const logout = useCallback(
    async (callback: () => Promise<boolean>) => {
      // if (typeof callback === "function") {
      //   try {
      //     setStatus(AuthStatus.loading);
      //     const data = await callback();
      //     if (data) {
      //       removeAccessToken();
      //       setUser(null);
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   } finally {
      //     setStatus(AuthStatus.loaded);
      //   }
      // }
      return true;
    },
    [removeAccessToken]
  );

  // const fetchProfile = useCallback(async () => {
  //   try {
  //     if (accessToken) {
  //       const username = String(accessToken).split("@")[0];
  //       const data: { username: string } = await new Promise((resolve) =>
  //         setTimeout(() => resolve({ username }), 1000)
  //       );
  //       if (data) {
  //         setUser({
  //           username
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setStatus(AuthStatus.loaded);
  //   }
  // }, [accessToken]);

  // useEffect(() => {
  //   if (user === null) {
  //     void fetchProfile();
  //   }
  // }, [user, fetchProfile]);

  const fetchUser = useCallback(
    async (fbUser: User) => {
      try {
        const userDocRef = getDocRef("users", fbUser.uid);
        const userDocData: any = await getDocument(userDocRef);
        if (userDocReference === null) {
          setUserDocReference(userDocRef);
        }
        // setUser({ ...fbUser, ...userDocData })
        setUser(userDocData);
      } catch (error) {
      } finally {
        setStatus(AuthStatus.loaded);
        Loading.get().hide();
      }
    },
    [userDocReference]
  );

  const debounceFetchUser = debounce(fetchUser, 1000);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid
        if (user === null) {
          // console.log(fbUser)
          debounceFetchUser(fbUser);
        }
        // ...
      } else {
        // User is signed out
        // ...
        setUserDocReference(null);
        setUser(null);
        setStatus(AuthStatus.loaded);
        Loading.get().hide();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isLoggedIn,
        login,
        logout,
        setStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
