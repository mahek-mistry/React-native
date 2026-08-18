import React from 'react';

import {Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import UsersScreen from '../screens/users/UsersScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#888888',

        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#eeeeee',
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <TextIcon
              icon="⌂"
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarLabel: 'Users',
          tabBarIcon: ({color}) => (
            <TextIcon
              icon="♟"
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color}) => (
            <TextIcon
              icon="🔔"
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <TextIcon
              icon="●"
              color={color}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

const TextIcon = ({icon, color}) => {
  return (
    <Text
      style={{
        fontSize: 20,
        color,
      }}>
      {icon}
    </Text>
  );
};

export default BottomTabNavigator;