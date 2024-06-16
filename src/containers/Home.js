import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchProducts} from '../store/actions';
import Header from '../common/Header';
import Product from '../components/Products';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.rootReducer.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <View>
      <Header navigation={navigation} />
      <FlatList
        data={products.products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Product product={item} navigation={navigation} />
        )}
        style={styles.container}
        ListEmptyComponent={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    marginBottom: 70,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
