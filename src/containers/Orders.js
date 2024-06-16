import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';

const Orders = () => {
  const {t} = useTranslation();
  const cartItems = useSelector(state => state.rootReducer.items);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.thumbnail}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemCount}>
          {t('order.Quantity')}: {item.count}
        </Text>
        <Text style={styles.itemPrice}>
          {t('order.Price')}: ${item.price.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            {t('order.No items in your order')}.
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemCount: {
    fontSize: 16,
    color: '#777',
    marginBottom: 3,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Orders;
