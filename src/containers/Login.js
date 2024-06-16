import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

import {validateEmail, validatePassword} from '../utils/Helpers';
import {login} from '../store/actions';

const LoginScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert(t('login.Please enter a valid email address'));
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        t('login.Password validation failed'),
        t(
          'login.Password must be at least 8 characters long and contain uppercase, lowercase, numeric digits, and special characters',
        ),
      );
      return;
    }

    const loggedIn = dispatch(login(email, password));
    if (loggedIn) {
      await AsyncStorage.setItem('email', email);
      navigation.navigate('Home');
    } else {
      Alert.alert(t('login.Invalid email or password'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{t('login.Login')}</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('login.email')}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder={t('login.Password')}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{t('login.Login')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'tomato',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff6347',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
