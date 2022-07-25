/* eslint-disable camelcase */

import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import Toast from 'react-native-toast-message';

import { customTheme } from './styles/theme';

import { Routes } from './routes';
import { Loading } from './components/Loading';
import { AuthProvider } from './contexts/auth';

export const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={customTheme}>
      <AuthProvider>
        <StatusBar translucent backgroundColor="transparent" style="light" />
        {fontsLoaded ? <Routes /> : <Loading />}
        <Toast />
      </AuthProvider>
    </NativeBaseProvider>
  );
};
