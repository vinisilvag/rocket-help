import { useRoute } from '@react-navigation/native';
import { VStack } from 'native-base';
import React from 'react';
import { OrderHeader } from '../components/Headers/Order';

type RouteParams = {
  orderId: string;
};

export const Details: React.FC = () => {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  console.log(orderId);

  return (
    <VStack flex={1} bg="gray.700">
      <OrderHeader title="Solicitação" />
    </VStack>
  );
};
