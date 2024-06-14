import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/containers/Home';
import Login from './src/containers/Login';
import Account from './src/containers/Account';
import Products from './src/containers/Products';
import ProductDetails from './src/containers/ProductDetails';
import ProductCart from './src/containers/ProductCart';
import OrderDetails from './src/containers/OrderDetails';
import Settings from './src/containers/Settings';
import {Provider} from 'react-redux';
import {Store} from './src/store/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Product" component={Products} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="ProductCart" component={ProductCart} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
