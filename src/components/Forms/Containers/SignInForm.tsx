import React from 'react';
import { VStack } from 'native-base';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Envelope, Key } from 'phosphor-react-native';

import { useAuth } from '@hooks/useAuth';

import { Input } from '@components/Forms/Input';
import { Button } from '@components/Forms/Button';

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
    <VStack w="full">
      <Input
        control={control}
        inputName="email"
        placeholder="E-mail"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        leftIcon={Envelope}
      />
      <Input
        control={control}
        inputName="password"
        placeholder="Senha"
        autoCapitalize="none"
        secureTextEntry
        leftIcon={Key}
      />

      <Button
        title="Entrar"
        w="full"
        mt={2}
        onPress={handleSubmit(handleSignIn)}
        isLoading={isSubmitting}
      />
    </VStack>
  );
};
