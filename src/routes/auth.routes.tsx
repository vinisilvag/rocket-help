import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '@screens/SignIn';

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="signIn" component={SignIn} />
  </Navigator>
);
