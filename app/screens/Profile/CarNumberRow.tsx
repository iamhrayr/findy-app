import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { CarWithWrapper } from '@app/models/Car';
import { Text, Layout, Button } from '@app/components';

type Props = {
  data: CarWithWrapper & {
    onDelete?: () => void;
    onEdit?: () => void;
  };
  navigateToEdit: (data: CarWithWrapper) => void;
};

const CarNumberRow: React.FC<Props> = ({ data, navigateToEdit }) => {
  const deleteCar = useCallback(() => {
    // delete
  }, []);

  const handleDeletePress = useCallback(() => {
    Alert.alert(
      'Are you sure?',
      'This operation could not be undone',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: deleteCar },
      ],
      { cancelable: false },
    );
  }, [deleteCar]);

  return (
    <Layout layout="row">
      <Layout grow={1}>
        <Text size="h3" spacer={{ b: 'xs' }}>
          {data.car.carNumber}
        </Text>
        <Text size="xs" color="darkGray">
          Added: {'data.car.added'}
        </Text>
      </Layout>
      <Layout layout="row">
        <Button
          type="danger"
          size="sm"
          shape="circle"
          icon={<Icon name="delete" size={18} color="white" />}
          onPress={handleDeletePress}
        />
        <Button
          size="sm"
          shape="circle"
          spacer={{ l: 'sm' }}
          icon={<Icon name="edit" size={18} color="white" />}
          onPress={() => navigateToEdit(data)}
        />
      </Layout>
    </Layout>
  );
};

export default CarNumberRow;
