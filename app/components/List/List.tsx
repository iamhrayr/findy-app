import React, { memo } from 'react';
import { FlatList, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { s } from 'react-native-size-matters';

// TODO: fix the types
type Props = {
  data: Array<any>;
  bordered?: boolean;
  lastItemBordered?: boolean;
  virtualized?: boolean;
  keyExtractor?: (row: any) => string;
  renderItem: (row: any, index?: number) => React.ReactNode;
  children?: React.ReactNode;
};

const ListItem = styled(View)<{
  bordered?: boolean;
  noPaddingTop?: boolean;
  noPaddingBottom?: boolean;
}>`
  padding-vertical: ${s(20)}px;
  ${({ bordered, theme }) =>
    bordered &&
    css`
      border-bottom-width: ${s(1)}px;
      border-bottom-color: ${theme.colors.lightGray};
    `}
  ${({ noPaddingTop }) =>
    noPaddingTop &&
    css`
      padding-top: 0;
    `}
    ${({ noPaddingBottom }) =>
      noPaddingBottom &&
      css`
        padding-bottom: 0;
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
        keyExtractor={keyExtractor ? (item) => keyExtractor(item) : undefined}
        renderItem={({ item, index }) => (
          <ListItem
            noPaddingTop={index === 0}
            noPaddingBottom={index === data.length - 1}
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

export default memo<Props>(List);
