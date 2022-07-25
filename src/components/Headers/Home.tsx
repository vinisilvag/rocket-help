import React from 'react';
import { HStack, IconButton, useTheme } from 'native-base';

import { SignOut } from 'phosphor-react-native';
import Logo from '../../assets/logo-secondary.svg';

import { useAuth } from '../../hooks/useAuth';

export const HomeHeader: React.FC = () => {
  const { colors } = useTheme();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pt={12}
      pb={6}
      px={6}
    >
      <Logo />

      <IconButton
        icon={<SignOut size={26} color={colors.gray[300]} />}
        _pressed={{ bg: 'gray.500' }}
        onPress={handleSignOut}
      />
    </HStack>
  );
};
