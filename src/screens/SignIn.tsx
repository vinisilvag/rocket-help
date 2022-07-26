import React from 'react';
import { ScrollView, VStack, Heading } from 'native-base';

import Logo from '@assets/logo-primary.svg';
import { SignInForm } from '@components/Forms/Containers/SignInForm';

export const SignIn: React.FC = () => (
  <ScrollView flex={1} showsVerticalScrollIndicator={false} bg="gray.600">
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} py={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <SignInForm />
    </VStack>
  </ScrollView>
);
