import React from 'react';
import { VStack } from 'native-base';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
  const { control, handleSubmit } = useForm<NewOrderFormData>({
    resolver: yupResolver(newOrderFormSchema),
    defaultValues: {
      patrimony: '',
      description: '',
    },
  });

  const handleCreateNewOrder: SubmitHandler<NewOrderFormData> = (data) => {
    console.log(data);
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
      />
    </VStack>
  );
};
