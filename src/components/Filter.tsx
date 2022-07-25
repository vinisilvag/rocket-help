import React from 'react';
import { Button, IButtonProps, Text, useTheme } from 'native-base';

type FilterProps = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: 'open' | 'closed';
};

export const Filter: React.FC<FilterProps> = ({
  title,
  isActive = false,
  type,
  ...rest
}) => {
  const { colors } = useTheme();

  const colorType = type === 'open' ? colors.secondary[700] : colors.green[300];

  return (
    <Button
      variant="outline"
      borderWidth={1}
      borderColor={isActive ? colorType : 'gray.600'}
      bgColor="gray.600"
      flex={1}
      size="sm"
      {...rest}
    >
      <Text
        color={isActive ? colorType : 'gray.300'}
        fontSize="xs"
        textTransform="uppercase"
      >
        {title}
      </Text>
    </Button>
  );
};
