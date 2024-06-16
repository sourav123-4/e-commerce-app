import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {
  addToCart,
  decreaseCount,
  increaseCount,
  setCurrentProduct,
} from '../store/actions';

const Product = ({product, navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.rootReducer);
  const cartItem = cart.items.find(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncrease = () => {
    dispatch(increaseCount(product.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseCount(product.id));
  };

  const navigateToProductDetails = () => {
    dispatch(setCurrentProduct(product));
    navigation.navigate('ProductDetails');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigateToProductDetails}>
      <Image source={{uri: product.thumbnail}} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.stock}>
          {t('product.Stock')}: {product.stock}
        </Text>
        {!cartItem || cartItem?.count === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>{t('product.Add to Cart')}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.cartControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleDecrease}>
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.count}>{cartItem.count}</Text>
            <TouchableOpacity
              style={[
                styles.controlButton,
                cartItem.count >= product.stock && styles.disabledButton,
              ]}
              onPress={handleIncrease}
              disabled={cartItem.count >= product.stock}>
              <Text
                style={[
                  styles.controlButtonText,
                  cartItem.count >= product.stock && styles.disabledButtonText,
                ]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  brand: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ff6347',
  },
  stock: {
    fontSize: 13,
    color: '#777',
  },
  addButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: 'black',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledButtonText: {
    color: '#777',
  },
});

export default Product;
