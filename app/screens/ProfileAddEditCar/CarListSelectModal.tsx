import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';

import { RootState } from '@app/redux/rootReducer';
import { fetchBrandsAndModels } from '@app/redux/ducks/brandsModels/actions';

import { Container, Text, Button, Layout, Input, List, If } from '@app/components';

type Props = {
  isVisible: boolean;
};

const CarListSelectModal = ({ isVisible }: Props) => {
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandsAndModels());
  }, [dispatch]);

  const brandsModels = useSelector((state: RootState) => state.brandsModels);
  const filteredModels = useMemo(() => {
    return brandsModels.data.brands.filter(brand => brand.name.includes(searchText));
  }, [searchText, brandsModels.data.brands]);

  const handleSearchInputChange = useCallback(val => {
    setSearchText(val);
  }, []);

  if (brandsModels.loading) {
    <Text>Loading...</Text>;
  }

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <Container>
        <SafeAreaView style={styles.safeArea}>
          <Layout spacer={{ x: 'lg' }}>
            <Input
              placeholder="Type to search..."
              onChangeText={handleSearchInputChange}
            />
          </Layout>

          <Layout spacer={{ x: 'lg' }} size={1}>
            <If condition={filteredModels.length === 0}>
              <Text>No result</Text>
            </If>

            <If condition={filteredModels.length > 0}>
              <List
                virtualized
                bordered={false}
                data={filteredModels}
                keyExtractor={item => String(item.pk)}
                renderItem={item => <Text>{item.name}</Text>}
              />
            </If>
          </Layout>

          <Layout spacer={{ x: 'lg' }} noShrink>
            <Button shape="circle" spacer={{ t: 'xl' }}>
              Submit
            </Button>
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
