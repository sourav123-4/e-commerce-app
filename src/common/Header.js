import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('navigationsHeader.MyApp')}</Text>
      <View style={styles.icons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('ProductCart')}>
          <Icon name="cart-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ff6347',
    borderBottomWidth: 1,
    borderBottomColor: '#ff6347',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 8,
  },
});

export default Header;
