import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/Loading';

import { AuthRoutes } from '@routes/auth.routes';
import { AppRoutes } from '@routes/app.routes';

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
