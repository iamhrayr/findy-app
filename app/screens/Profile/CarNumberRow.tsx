import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { Text, Layout, Button } from '@app/components';

type Props = {
  data: {
    number: string;
    added: string;
    onDelete: () => void;
    onEdit: () => void;
  };
};

const CarNumberRow: React.FC<Props> = ({ data }) => {
  return (
    <Layout layout="row">
      <Layout grow={1}>
        <Text size="h2" spacer={{ b: 'xs' }}>
          {data.number}
        </Text>
        <Text size="xs" color="darkGray">
          Added: {data.added}
        </Text>
      </Layout>
      <Layout layout="row">
        <Button
          type="danger"
          size="sm"
          shape="circle"
          icon={<Icon name="delete" size={18} color="white" />}
        />
        <Button
          // type="danger"
          size="sm"
          shape="circle"
          spacer={{ l: 'sm' }}
          icon={<Icon name="edit" size={18} color="white" />}
        />
      </Layout>
    </Layout>
  );
};

export default CarNumberRow;
