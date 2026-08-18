import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const NotificationCard = ({
  notification,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(notification)}
      style={[
        styles.card,
        !notification.read && styles.unreadCard,
      ]}>

      <View
        style={[
          styles.iconContainer,
          !notification.read && styles.unreadIcon,
        ]}>

        <Text style={styles.icon}>
          {notification.icon}
        </Text>

      </View>

      <View style={styles.content}>

        <Text
          style={[
            styles.message,
            !notification.read &&
              styles.unreadMessage,
          ]}>

          {notification.message}

        </Text>

        <Text style={styles.time}>
          {notification.time}
        </Text>

      </View>

      {!notification.read && (
        <View style={styles.unreadDot} />
      )}

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 76,

    marginHorizontal: 12,
    marginVertical: 5,

    padding: 12,

    backgroundColor: '#ffffff',

    borderRadius: 12,

    flexDirection: 'row',
    alignItems: 'center',

    elevation: 1,
  },

  unreadCard: {
    backgroundColor: '#eff6ff',
  },

  iconContainer: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: '#f1f1f1',

    justifyContent: 'center',
    alignItems: 'center',
  },

  unreadIcon: {
    backgroundColor: '#dbeafe',
  },

  icon: {
    fontSize: 20,
  },

  content: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
  },

  message: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555555',
  },

  unreadMessage: {
    fontWeight: '600',
    color: '#222222',
  },

  time: {
    marginTop: 4,
    fontSize: 11,
    color: '#999999',
  },

  unreadDot: {
    width: 9,
    height: 9,

    borderRadius: 5,

    backgroundColor: '#2563eb',
  },
});

export default NotificationCard;