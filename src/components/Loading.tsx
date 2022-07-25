import React from 'react';

import { Center, Spinner } from 'native-base';

export const Loading: React.FC = () => (
  <Center flex={1} bg="gray.600">
    <Spinner size="lg" color="secondary.700" />
  </Center>
);
