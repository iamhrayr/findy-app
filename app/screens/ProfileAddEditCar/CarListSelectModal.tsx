import React, { useState, useCallback, useMemo, memo } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Box, Text, Modal } from 'react-native-magnus';

import { Input, If, Loading } from '@app/components';
// import { withInteractionsComplete } from '@app/HoCs';

type Props = {
  isVisible: boolean;
  data: any[];
  loading: boolean;
  close: () => void;
  onSelect: (item: any) => void;
};

const INITIAL_FLATLIST_COUNT = 15;

const CarListSelectModal = ({ isVisible, close, onSelect, data, loading }: Props) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [modalDidShow, setModalDidShow] = useState(false);

  const filteredData = useMemo(() => {
    return modalDidShow && !loading
      ? data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
      : [];
  }, [data, searchText, modalDidShow, loading]);

  const handleSearchInputChange = useCallback((val) => {
    setSearchText(val);
  }, []);

  const extractKey = useCallback((item) => String(item.pk), []);
  const renderSeparator = useCallback(() => <Box mb="xs" />, []);
  const renderItem = useCallback(
    ({ item }) => (
      <Text py="md" onPress={() => onSelect(item)}>
        {item.name}
      </Text>
    ),
    [onSelect],
  );

  if (isVisible && loading) {
    return <Loading />;
  }

  return (
    <Modal isVisible={isVisible} onModalShow={() => setModalDidShow(true)}>
      <SafeAreaView style={styles.safeArea}>
        <Box mx="lg">
          <Input
            placeholder="Type to search..."
            onChangeText={handleSearchInputChange}
            value={searchText}
            autoCorrect={false}
            suffix={
              <Text color="primary" onPress={close}>
                {t('close')}
              </Text>
            }
          />
        </Box>

        <Box mx="lg" flex={1}>
          <If condition={filteredData.length === 0}>
            <Text>{t('no_result')}</Text>
          </If>

          <If condition={filteredData.length > 0}>
            <FlatList
              data={filteredData}
              initialNumToRender={INITIAL_FLATLIST_COUNT}
              ItemSeparatorComponent={renderSeparator}
              keyExtractor={extractKey}
              renderItem={renderItem}
            />
          </If>
        </Box>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

// export default withInteractionsComplete<Props>(memo(CarListSelectModal));
export default memo(CarListSelectModal);
