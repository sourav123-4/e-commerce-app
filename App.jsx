import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

import Login from './src/containers/Login';
import Account from './src/containers/Account';
import Products from './src/components/Products';
import ProductDetails from './src/components/ProductDetails';
import ProductCart from './src/containers/Cart';
import OrderDetails from './src/containers/Orders';
import Settings from './src/containers/Settings';
import {Provider} from 'react-redux';
import {Store} from './src/store/store';
import Home from './src/TabNavigators';
import './src/locales/i18n';

const Stack = createStackNavigator();

const App = () => {
  const {t} = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem('email');
      if (email !== null) {
        setIsLoggedIn(true);
      }
    })();
  }, [isLoggedIn]);

  const screenOptions = {
    headerStyle: {
      backgroundColor: 'tomato',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
  };

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{...screenOptions, title: t('navigationsHeader.Account')}}
          />
          <Stack.Screen
            name="Products"
            component={Products}
            options={{...screenOptions, title: t('navigationsHeader.Products')}}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{
              ...screenOptions,
              title: t('navigationsHeader.ProductDetails'),
            }}
          />
          <Stack.Screen
            name="ProductCart"
            component={ProductCart}
            options={{
              ...screenOptions,
              title: t('navigationsHeader.ShoppingCart'),
            }}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={{
              ...screenOptions,
              title: t('navigationsHeader.YourOrders'),
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{...screenOptions, title: t('navigationsHeader.settings')}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
