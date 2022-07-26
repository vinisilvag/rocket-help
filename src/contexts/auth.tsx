/* eslint-disable no-unused-vars */

import React, { createContext, useState, useEffect } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import { SignInFormData } from '@components/Forms/Containers/SignInForm';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  signIn: (signInCredentials: SignInFormData) => Promise<any>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((signedUser) => {
      if (signedUser) setUser(signedUser);
      else setUser(null);

      setIsLoadingUser(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async ({ email, password }: SignInFormData) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);

        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          return Toast.show({
            type: 'error',
            text1: 'Entrar',
            text2: 'E-mail ou senha inválida.',
          });
        }

        return Toast.show({
          type: 'error',
          text1: 'Entrar',
          text2: 'Não foi possível acessar essa conta.',
        });
      });
  };

  const signOut = async () => {
    await auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
