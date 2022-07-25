import React from 'react';
import {
  Heading,
  HStack,
  IconButton,
  useTheme,
  StyledProps,
} from 'native-base';

import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
  title: string;
};

export const OrderHeader: React.FC<Props> = ({ title, ...rest }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pt={12}
      pb={6}
      {...rest}
    >
      <IconButton
        icon={<CaretLeft size={26} color={colors.gray[200]} />}
        _pressed={{ bg: 'gray.500' }}
        onPress={handleNavigateBack}
      />

      <Heading
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
};
