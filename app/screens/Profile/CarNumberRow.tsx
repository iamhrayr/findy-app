import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { Car } from '@app/models/Car';
import { Text, Layout, Button } from '@app/components';

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
  const removeCar = useCallback(() => {
    onRemove(data.pk);
  }, [data.pk, onRemove]);

  const handleDeletePress = useCallback(() => {
    Alert.alert(
      'Are you sure?',
      'This operation could not be undone',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: removeCar },
      ],
      { cancelable: false },
    );
  }, [removeCar]);

  return (
    <Layout layout="row">
      <Layout grow={1}>
        <Text size="h3" spacer={{ b: 'xs' }}>
          {data.carNumber}
        </Text>
        <Text size="xs" color="darkGray">
          Added: {'data.added'}
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
