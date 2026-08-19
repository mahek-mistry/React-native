import React from 'react';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Ionicons from
  'react-native-vector-icons/Ionicons';

import HomeScreen from
  '../screens/HomeScreen';

import NotesScreen from
  '../screens/NotesScreen';

import FavoritesScreen from
  '../screens/FavoritesScreen';

const Tab =
  createBottomTabNavigator();

const BottomTabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({

        headerShown: false,

        tabBarActiveTintColor:
          '#007AFF',

        tabBarInactiveTintColor:
          '#777',

        tabBarIcon: ({
          focused,
          color,
          size,
        }) => {

          let iconName =
            'ellipse-outline';

          if (
            route.name ===
            'HomeTab'
          ) {
            iconName = focused
              ? 'home'
              : 'home-outline';
          }

          if (
            route.name ===
            'Favorites'
          ) {
            iconName = focused
              ? 'heart'
              : 'heart-outline';
          }

          if (
            route.name ===
            'Notes'
          ) {
            iconName = focused
              ? 'document-text'
              : 'document-text-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}>

      <Tab.Screen
        name="HomeTab"
        component={
          HomeScreen
        }
        options={{
          title: 'Home',
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={
          FavoritesScreen
        }
      />

      <Tab.Screen
        name="Notes"
        component={
          NotesScreen
        }
      />

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;