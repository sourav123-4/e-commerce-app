import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, decreaseCount, increaseCount} from '../store/actions';
import {useTranslation} from 'react-i18next';

const ProductDetails = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const product = useSelector(state => state.rootReducer.currentProduct);
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

  if (!product) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: product.thumbnail}} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.brand}>
          {t('product.Brand')}: {product.brand}
        </Text>
        <Text style={styles.price}>
          {t('product.Price')}: ${product.price}
        </Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.stock}>
            {t('product.Stock')}: {product.stock}
          </Text>
          <Text style={styles.category}>
            {t('product.Category')}: {product.category}
          </Text>
        </View>
        <Text style={styles.tags}>
          {t('product.Tags')}: {product.tags.join(', ')}
        </Text>
        <Text style={styles.warranty}>
          {t('product.Warranty')}: {product.warrantyInformation}
        </Text>
        <Text style={styles.shipping}>
          {t('product.Shipping')}: {product.shippingInformation}
        </Text>

        {!cartItem || cartItem.count === 0 ? (
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  thumbnail: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  brand: {
    fontSize: 18,
    color: '#777',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff6347',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#555',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stock: {
    fontSize: 16,
    color: '#777',
  },
  category: {
    fontSize: 16,
    color: '#777',
  },
  tags: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  warranty: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  shipping: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: '#333',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledButtonText: {
    color: '#777',
  },
});

export default ProductDetails;
