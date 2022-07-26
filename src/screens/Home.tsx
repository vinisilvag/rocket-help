import React, { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  FlatList,
  Center,
  useTheme,
  Spinner,
  Box,
} from 'native-base';

import firestore from '@react-native-firebase/firestore';

import { ChatTeardropText } from 'phosphor-react-native';

import { useNavigation } from '@react-navigation/native';

import { HomeHeader } from '@components/Headers/Home';
import { Filter } from '@components/Filter';
import { Button } from '@components/Forms/Button';
import { Order, OrderProps } from '@components/Order';

import { dateFormat } from '@utils/firestoreDateFormat';

export const Home: React.FC = () => {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>(
    'open',
  );

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(
        (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            const { patrimony, descrption, status, created_at } = doc.data();

            return {
              id: doc.id,
              patrimony,
              descrption,
              status,
              when: dateFormat(created_at),
            };
          });

          setOrders(data);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
        },
      );

    return unsubscribe;
  }, [statusSelected]);

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

        {isLoading ? (
          <Box flex={1}>
            <Spinner size="sm" color="secondary.700" />
          </Box>
        ) : (
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
            contentContainerStyle={{ paddingBottom: 4 }}
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
        )}

        <Button
          title="Nova solicitação"
          onPress={handleNavigateToNewOrder}
          mt={5}
        />
      </VStack>
    </VStack>
  );
};
