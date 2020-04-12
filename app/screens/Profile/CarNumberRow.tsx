import React, { useCallback } from 'react';
import { Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { s } from 'react-native-size-matters';

import { Car } from '@app/types/Car';
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

const Dot = styled(View)<Partial<Car>>`
  width: ${s(10)}px;
  height: ${s(10)}px;
  border-radius: ${s(10)}px;
  margin-right: ${s(5)}px;
  background-color: ${({ color }) => color};
`;

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
    <Layout layout="row" align="center">
      <Layout grow={1}>
        <Text size="h3" spacer={{ b: 'xs' }}>
          {data.carNumber}
        </Text>
        <Layout layout="row" align="center">
          <Dot color={data.color} />
          <Text size="xs" color="darkGray">
            {data.makeName}
          </Text>
        </Layout>
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
