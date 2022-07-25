import React, { useState } from 'react';
import {
  VStack,
  Input as NativeBaseInput,
  IInputProps,
  Text,
  IconButton,
  useTheme,
} from 'native-base';

import { Eye, EyeSlash } from 'phosphor-react-native';

import { Controller, FieldValues } from 'react-hook-form';

type InputProps = IInputProps & {
  inputName: string;
  control: FieldValues | any;
};

export const Input: React.FC<InputProps> = ({
  inputName,
  control,
  secureTextEntry,
  flex,
  ...rest
}) => {
  const { colors } = useTheme();
  const [isShowingSecureTextEntry, setIsShowingSecureTextEntry] =
    useState(false);

  return (
    <Controller
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <VStack w="full" flex={flex}>
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
            flex={flex}
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
            InputRightElement={
              secureTextEntry && (
                <IconButton
                  icon={
                    isShowingSecureTextEntry ? (
                      <EyeSlash size={24} color={colors.gray[300]} />
                    ) : (
                      <Eye size={24} color={colors.gray[300]} />
                    )
                  }
                  mr={1.5}
                  _pressed={{ bg: 'gray.500' }}
                  onPress={() =>
                    setIsShowingSecureTextEntry(!isShowingSecureTextEntry)
                  }
                />
              )
            }
            secureTextEntry={!!(secureTextEntry && !isShowingSecureTextEntry)}
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
};
