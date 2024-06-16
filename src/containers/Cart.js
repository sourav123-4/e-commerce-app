import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {increaseCount, decreaseCount} from '../store/actions';

const Cart = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const items = useSelector(state => state.rootReducer.items);
  const totalPrice = useSelector(state => state.rootReducer.totalPrice);
  const totalCount = useSelector(state => state.rootReducer.totalCount);

  const handleIncrease = id => {
    dispatch(increaseCount(id));
  };

  const handleDecrease = id => {
    dispatch(decreaseCount(id));
  };

  const handleCheckout = () => {
    navigation.navigate('OrderDetails');
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.thumbnail}} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.itemQuantity}>
        <TouchableOpacity
          style={[styles.quantityButton, item.count <= 0 && {opacity: 0.5}]}
          onPress={() => handleDecrease(item.id)}
          disabled={item.count <= 0}>
          <Ionicons name="remove-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.itemCount}>{item.count}</Text>
        <TouchableOpacity
          style={[
            styles.quantityButton,
            {opacity: item.count >= item.stock ? 0.5 : 1},
          ]}
          onPress={() => handleIncrease(item.id)}
          disabled={item.count >= item.stock}>
          <Ionicons name="add-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={items.length === 0 && styles.emptyList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>{t('cart.Your cart is empty')}</Text>
        )}
      />
      {items.length > 0 && (
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('cart.Total Items')}</Text>
            <Text style={styles.totalValue}>{totalCount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('cart.Total Price')}</Text>
            <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>
              {t('cart.Proceed to Checkout')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#777',
  },
  itemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ff6347',
    padding: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  totalContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});

export default Cart;
