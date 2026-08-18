import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';

import BottomTabNavigator from './BottomTabNavigator';

import PostDetailsScreen from '../screens/home/PostDetailsScreen';
import UserDetailsScreen from '../screens/users/UserDetailsScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
      />

      <Stack.Screen
        name="PostDetails"
        component={PostDetailsScreen}
      />

      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
      />

    </Stack.Navigator>
  );
};

export default RootNavigator;