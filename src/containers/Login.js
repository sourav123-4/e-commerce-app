import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchProducts} from '../store/actions';

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
