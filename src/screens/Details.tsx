import React from 'react';
import { VStack } from 'native-base';

import { useRoute } from '@react-navigation/native';

import { OrderHeader } from '@components/Headers/Order';

type RouteParams = {
  orderId: string;
};

export const Details: React.FC = () => {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  console.log(orderId);

  return (
    <VStack flex={1} px={6} bg="gray.600">
      <OrderHeader title="Solicitação" />
    </VStack>
  );
};
