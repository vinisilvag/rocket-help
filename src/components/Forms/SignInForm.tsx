import React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { VStack, Icon, useTheme, KeyboardAvoidingView } from 'native-base';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Envelope, Key } from 'phosphor-react-native';

import { Input } from '../Input';
import { Button } from '../Button';
import { useAuth } from '../../hooks/useAuth';

export type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object({
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve conter pelo menos 6 caracteres'),
});

export const SignInForm: React.FC = () => {
  const { colors } = useTheme();

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await signIn(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack w="full">
          <Input
            control={control}
            inputName="email"
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            InputLeftElement={
              <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
            }
          />
          <Input
            control={control}
            inputName="password"
            placeholder="Senha"
            autoCapitalize="none"
            secureTextEntry
            InputLeftElement={
              <Icon as={<Key color={colors.gray[300]} />} ml={4} />
            }
          />

          <Button
            title="Entrar"
            w="full"
            mt={2}
            onPress={handleSubmit(handleSignIn)}
            isLoading={isSubmitting}
          />
        </VStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
