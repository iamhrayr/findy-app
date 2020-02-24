import React from 'react';
import { FlatList, View } from 'react-native';
import styled, { css } from 'styled-components/native';

// TODO: fix the types
type Props = {
  data: Array<any>;
  bordered?: boolean;
  lastItemBordered?: boolean;
  virtualized?: boolean;
  keyExtractor?: (row: any) => string | number;
  renderItem: (row: any, index?: number) => React.ReactNode;
};

const ListItem = styled(View)<{ bordered?: boolean }>`
  padding-vertical: 20px;
  ${({ bordered, theme }) =>
    bordered &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.lightGray};
    `}
`;

const List: React.FC<Props> = ({
  data,
  renderItem,
  bordered,
  lastItemBordered,
  virtualized,
  keyExtractor,
}) => {
  if (virtualized) {
    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <ListItem
            bordered={bordered && (index === data.length - 1 ? lastItemBordered : true)}>
            {renderItem(item)}
          </ListItem>
        )}
      />
    );
  }

  return (
    <View>
      {data.map((item, index) => (
        <ListItem
          key={keyExtractor ? keyExtractor(item) : item.key}
          bordered={bordered && (index === data.length - 1 ? lastItemBordered : true)}>
          {renderItem(item, index)}
        </ListItem>
      ))}
    </View>
  );
};

export default List;
