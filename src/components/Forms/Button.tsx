import React from 'react';
import { Button as NativeBaseButton, Heading, IButtonProps } from 'native-base';

type ButtonProps = IButtonProps & {
  title: string;
};

export const Button: React.FC<ButtonProps> = ({ title, ...rest }) => (
  <NativeBaseButton
    bg="green.700"
    h={14}
    fontSize="sm"
    rounded="sm"
    _pressed={{ bg: 'green.500' }}
    {...rest}
  >
    <Heading color="white" fontSize="sm">
      {title}
    </Heading>
  </NativeBaseButton>
);
