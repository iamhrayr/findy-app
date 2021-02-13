import React, { useCallback, memo } from 'react';
import { Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { Box, Text, Icon } from 'react-native-magnus';

import { Button } from '@app/components';
import { Car } from '@app/types/Car';

type Props = {
  data: Car;
  // data: Car & {
  //   onDelete?: () => void;
  //   onEdit?: () => void;
  // };
  onRemove: (id: Id) => void;
  navigateToEdit: (data: Car) => void;
};

const CarNumberRow: React.FC<Props> = ({ data, onRemove, navigateToEdit }) => {
  const { t } = useTranslation();

  const removeCar = useCallback(() => {
    onRemove(data.pk);
  }, [data.pk, onRemove]);

  const handleDeletePress = useCallback(() => {
    Alert.alert(
      t('are_you_sure'),
      t('non_undone_operataion_warning'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        { text: t('yes'), onPress: removeCar },
      ],
      { cancelable: false },
    );
  }, [removeCar, t]);

  return (
    <Box flexDir="row" justifyContent="center">
      <Box flex={1}>
        <Text fontSize="4xl" mb="sm">
          {data.carNumber}
        </Text>
        <Box flexDir="row" alignItems="center">
          <Box w={10} h={10} bg={data.color} rounded="circle" mr="xs" />
          <Text fontSize="sm" color="gray800">
            {data.makeName}
          </Text>
        </Box>
      </Box>

      <Box flexDir="row">
        <Button
          variant="danger"
          size="sm"
          prefix={<Icon name="delete" fontSize={18} color="white" />}
          onPress={handleDeletePress}
        />
        <Button
          size="sm"
          ml="sm"
          prefix={<Icon name="edit" fontSize={18} color="white" />}
          onPress={() => navigateToEdit(data)}
        />
      </Box>
    </Box>
  );
};

export default memo(CarNumberRow);
