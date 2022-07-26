import React from 'react';
import { Box, VStack } from 'native-base';

import { OrderHeader } from '@components/Headers/Order';
import { DetailContent } from '@components/Details/DetailContent';

export const Details: React.FC = () => (
  <VStack flex={1} bg="gray.700">
    <Box px={6} bg="gray.600">
      <OrderHeader title="Solicitação" />
    </Box>

    <DetailContent />
  </VStack>
);
