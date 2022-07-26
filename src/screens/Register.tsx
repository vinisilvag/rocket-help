import React from 'react';
import { VStack } from 'native-base';

import { OrderHeader } from '@components/Headers/Order';
import { NewOrderForm } from '@components/Forms/Containers/NewOrderForm';

export const Register: React.FC = () => (
  <VStack flex={1} px={6} bg="gray.600">
    <OrderHeader title="Solicitação" />

    <NewOrderForm />
  </VStack>
);
