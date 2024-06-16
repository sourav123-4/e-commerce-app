import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const Account = ({navigation}) => {
  const {t} = useTranslation();
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 123 456 7890',
    address: '1234 Main St, Anytown, USA',
    profileImage: 'https://i.imgflip.com/6yvpkj.jpg',
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('email');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{uri: user.profileImage}} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>{t('login.email')}:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>{t('account.Phone')}:</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>{t('account.Address')}:</Text>
          <Text style={[styles.value, styles.addressValue]}>
            {user.address}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>{t('account.Logout')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 5,
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: '#777',
    flexShrink: 1,
  },
  addressValue: {
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Account;
