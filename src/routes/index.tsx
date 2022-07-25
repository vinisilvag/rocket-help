import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/Loading';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export const Routes: React.FC = () => {
  const { isLoadingUser, isAuthenticated } = useAuth();

  if (isLoadingUser) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
