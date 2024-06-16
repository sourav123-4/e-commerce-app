import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import HomeScreen from './containers/Home';
import Account from './containers/Account';
import Orders from './containers/Orders';

const Tab = createBottomTabNavigator();

const Home = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            iconName = 'home-outline';
          } else if (route.name === 'Account') {
            iconName = 'person-outline';
          } else if (route.name === 'OrderDetails') {
            iconName = 'list-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: t('navigationsHeader.Home'),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="OrderDetails"
        component={Orders}
        options={{
          tabBarLabel: t('navigationsHeader.Orders'),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: t('navigationsHeader.Account'),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
