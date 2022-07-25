import React from 'react';
import {
  VStack,
  Input as NativeBaseInput,
  IInputProps,
  Text,
} from 'native-base';

import { Controller, FieldValues } from 'react-hook-form';

type InputProps = IInputProps & {
  inputName: string;
  control: FieldValues | any;
};

export const Input: React.FC<InputProps> = ({
  inputName,
  control,
  ...rest
}) => (
  <Controller
    control={control}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
      <VStack w="full">
        <NativeBaseInput
          bg="gray.700"
          h={14}
          size="md"
          borderWidth={1}
          borderColor="gray.700"
          fontSize="md"
          fontFamily="body"
          color="white"
          placeholderTextColor="gray.300"
          selectionColor="green.500"
          isInvalid={!!error}
          mb={4}
          _focus={{
            borderColor: 'green.500',
            bg: 'gray.700',
          }}
          _invalid={{
            borderColor: 'red.400',
            mb: 0,
          }}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          {...rest}
        />

        {!!error && (
          <Text fontSize="sm" mt="1.5" mb={4} color="red.400">
            {error.message}
          </Text>
        )}
      </VStack>
    )}
    name={inputName}
  />
);
