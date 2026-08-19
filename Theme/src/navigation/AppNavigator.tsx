import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import BottomTabNavigator from
  './BottomTabNavigator';

import AddNoteScreen from
  '../screens/AddNoteScreen';

import EditNoteScreen from
  '../screens/EditNoteScreen';

const Stack =
  createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={
            BottomTabNavigator
          }
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AddNote"
          component={
            AddNoteScreen
          }
          options={{
            title: 'Add Note',
          }}
        />

        <Stack.Screen
          name="EditNote"
          component={
            EditNoteScreen
          }
          options={{
            title: 'Edit Note',
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator;