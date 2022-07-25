import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  FlatList,
  Center,
  useTheme,
} from 'native-base';

import { ChatTeardropText } from 'phosphor-react-native';

import { useNavigation } from '@react-navigation/native';
import { HomeHeader } from '../components/Headers/Home';
import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Order, OrderProps } from '../components/Order';

export const Home: React.FC = () => {
  const { colors } = useTheme();

  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>(
    'open',
  );

  const [orders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();

  const handleNavigateToNewOrder = () => {
    navigation.navigate('new');
  };

  const handleOpenOrderDetails = (orderId: string) => {
    navigation.navigate('details', { orderId });
  };

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HomeHeader />

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>

          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Order
              data={item}
              onPress={() => handleOpenOrderDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={36} />
              <Text color="gray.300" fontSize="lg" mt={3} textAlign="center">
                Você ainda não possui{'\n'}solicitações{' '}
                {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button title="Nova solicitação" onPress={handleNavigateToNewOrder} />
      </VStack>
    </VStack>
  );
};
