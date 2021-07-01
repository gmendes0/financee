import { useState } from "react";
import { createContext } from "react";
import { auth, googleProvider } from "../services/firebase";
import firebase from "firebase/app";
import { useEffect } from "react";
import Loading from "../components/Loading";

type UserContextType = {
  user: firebase.User;
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

/**
 * TODO:
 *  - Verificar se o usuário já está logado
 *  - Fazer trataiva de erros
 *  - Previnir o acesso as rotas protegidas
 */
export function UserContextProvider({
  children,
}: UserContextProviderProps): JSX.Element {
  const [user, setUser] = useState<firebase.User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  function signInWithGoogle(): Promise<firebase.auth.UserCredential> {
    return auth.signInWithPopup(googleProvider);
  }

  function signOut(): Promise<void> {
    return auth.signOut();
  }

  return (
    <UserContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {isLoading ? <Loading /> : children}
    </UserContext.Provider>
  );
}

export default UserContext;
