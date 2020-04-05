import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import { Container, Text, Layout, Input, If, Spacer, Loading } from '@app/components';

type Props = {
  isVisible: boolean;
  data: any[];
  loading: boolean;
  close: () => void;
  onSelect: (item: any) => void;
};

const CarListSelectModal = ({ isVisible, close, onSelect, data, loading }: Props) => {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [data, searchText]);

  const handleSearchInputChange = useCallback(val => {
    setSearchText(val);
  }, []);

  if (loading) {
    <Loading />;
  }

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <Container>
        <SafeAreaView style={styles.safeArea}>
          <Layout spacer={{ x: 'lg' }}>
            <Input
              placeholder="Type to search..."
              onChangeText={handleSearchInputChange}
              value={searchText}
              autoCorrect={false}
              addonRight={
                <Text color="primary" onPress={close}>
                  {t('close')}
                </Text>
              }
            />
          </Layout>

          <Layout spacer={{ x: 'lg' }} size={1}>
            <If condition={filteredData.length === 0}>
              <Text>{t('no_result')}</Text>
            </If>

            <If condition={filteredData.length > 0}>
              <FlatList
                data={filteredData}
                keyExtractor={item => String(item.pk)}
                ItemSeparatorComponent={() => <Spacer b="lg" />}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => onSelect(item)}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </If>
          </Layout>
        </SafeAreaView>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

export default CarListSelectModal;
