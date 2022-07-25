import React from 'react';
import { VStack } from 'native-base';

import firestore from '@react-native-firebase/firestore';

import Toast from 'react-native-toast-message';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';

import { Input } from '@components/Forms/Input';
import { Button } from '@components/Forms/Button';

type NewOrderFormData = {
  patrimony: string;
  description: string;
};

const newOrderFormSchema = yup.object({
  patrimony: yup.string().required('Número do patrimônio é obrigatório'),
  description: yup.string().required('Descrição do problema é obrigatória'),
});

export const NewOrderForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewOrderFormData>({
    resolver: yupResolver(newOrderFormSchema),
    defaultValues: {
      patrimony: '',
      description: '',
    },
  });

  const { user } = useAuth();

  const navigation = useNavigation();

  const handleCreateNewOrder: SubmitHandler<NewOrderFormData> = async ({
    patrimony,
    description,
  }) => {
    await firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
        creator_uid: user?.uid,
      })
      .then(() => {
        reset();

        Toast.show({
          type: 'success',
          text1: 'Solicitação',
          text2: 'Solicitação registrada com sucecsso.',
        });

        navigation.goBack();
      })
      .catch(() =>
        Toast.show({
          type: 'error',
          text1: 'Solicitação',
          text2: 'Falha ao cadastrar essa solicitação.',
        }),
      );
  };

  return (
    <VStack flex={1} w="full" mt={2} pb={6}>
      <Input
        control={control}
        inputName="patrimony"
        placeholder="Número do patrimônio"
      />
      <Input
        control={control}
        inputName="description"
        placeholder="Descrição do problema"
        flex={1}
        multiline
        textAlignVertical="top"
      />

      <Button
        title="Cadastrar"
        w="full"
        mt={2}
        onPress={handleSubmit(handleCreateNewOrder)}
        isLoading={isSubmitting}
      />
    </VStack>
  );
};
