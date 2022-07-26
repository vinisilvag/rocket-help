import React, { useState, useEffect } from 'react';
import {
  HStack,
  VStack,
  useTheme,
  Text,
  ScrollView,
  Box,
  Spinner,
  Center,
} from 'native-base';

import {
  SmileyXEyes,
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
} from 'phosphor-react-native';

import firestore from '@react-native-firebase/firestore';

import { useNavigation, useRoute } from '@react-navigation/native';

import { dateFormat } from '@utils/firestoreDateFormat';

import Toast from 'react-native-toast-message';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import type { OrderProps } from '@components/Order';
import type { OrderFirestoreDTO } from '@DTOs/OrderFirestoreDTO';

import { Input } from '@components/Forms/Input';
import { Button } from '@components/Forms/Button';
import { CardDetails } from './CardDetails';

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution?: string;
  closed: string | null;
};

type SolutionFormData = {
  solution: string;
};

const solutionFormSchema = yup.object({
  solution: yup.string().required('Solução é obrigatória'),
});

export const DetailContent: React.FC = () => {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SolutionFormData>({
    resolver: yupResolver(solutionFormSchema),
    defaultValues: {
      solution: '',
    },
  });

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data() as OrderFirestoreDTO;

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });
      })
      .catch((error) => {
        console.log(error);

        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderId]);

  const handleSubmitSolution: SubmitHandler<SolutionFormData> = async ({
    solution,
  }) => {
    await firestore()
      .collection('orders')
      .doc(order.id)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })

      .then((error) => {
        console.log(error);

        Toast.show({
          type: 'success',
          text1: 'Solicitação',
          text2: 'Solicitação encerrada com sucecsso.',
        });

        navigation.goBack();
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Solicitação',
          text2: 'Falha ao encerrar essa solicitação.',
        });
      });
  };

  if (isLoading) {
    return (
      <Box flex={1}>
        <Spinner size="sm" color="secondary.700" pt={8} />
      </Box>
    );
  }

  if (hasError) {
    return (
      <Box p={6}>
        <Center>
          <SmileyXEyes color={colors.gray[300]} size={36} />
          <Text color="gray.300" fontSize="lg" mt={3} textAlign="center">
            Falha ao carregar os dados{'\n'}dessa solicitação.
          </Text>
        </Center>
      </Box>
    );
  }

  return (
    <>
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === 'closed' ? ' finalizado' : ' em andamento'}
        </Text>
      </HStack>

      <ScrollView showsVerticalScrollIndicator={false} px={6}>
        <VStack flex={1} space={5} pt={5}>
          <CardDetails
            title="equipamento"
            description={`Patrimônio ${order.patrimony}`}
            icon={DesktopTower}
          />

          <CardDetails
            title="descrição do problema"
            description={order.description}
            icon={Clipboard}
            footer={`Registrado em ${order.when}`}
          />

          <CardDetails
            title="solução"
            icon={CircleWavyCheck}
            description={order.solution}
            footer={order.closed ? `Encerrado em ${order.closed}` : undefined}
          >
            {order.status === 'open' && (
              <Input
                control={control}
                inputName="solution"
                placeholder="Escreva aqui a descrição da solução"
                textAlignVertical="top"
                multiline
                bg="gray.600"
                borderColor="gray.600"
                h={40}
              />
            )}
          </CardDetails>
        </VStack>
      </ScrollView>

      {order.status === 'open' && (
        <Box p={5}>
          <Button
            title="Encerrar solicitação"
            onPress={handleSubmit(handleSubmitSolution)}
            isLoading={isSubmitting}
            w="full"
          />
        </Box>
      )}
    </>
  );
};
