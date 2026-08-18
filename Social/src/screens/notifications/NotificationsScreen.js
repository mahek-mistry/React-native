import React, {useState} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import NotificationCard from '../../components/NotificationCard';

const initialNotifications = [
  {
    id: '1',
    message: 'John liked your post',
    time: '2 minutes ago',
    icon: '❤️',
    read: false,
  },

  {
    id: '2',
    message: 'Sarah started following you',
    time: '15 minutes ago',
    icon: '👤',
    read: false,
  },

  {
    id: '3',
    message: 'You have a new comment',
    time: '1 hour ago',
    icon: '💬',
    read: false,
  },

  {
    id: '4',
    message: 'Your post received 10 likes',
    time: '2 hours ago',
    icon: '👍',
    read: true,
  },

  {
    id: '5',
    message: 'Mike mentioned you in a post',
    time: 'Yesterday',
    icon: '📢',
    read: true,
  },

  {
    id: '6',
    message: 'Emma started following you',
    time: 'Yesterday',
    icon: '👤',
    read: true,
  },
];

const NotificationsScreen = () => {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const unreadCount = notifications.filter(
    item => !item.read,
  ).length;

  const markAsRead = notification => {
    setNotifications(previous =>
      previous.map(item =>
        item.id === notification.id
          ? {
              ...item,
              read: true,
            }
          : item,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(previous =>
      previous.map(item => ({
        ...item,
        read: true,
      })),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />

      <View style={styles.container}>

        {/* Header */}

        <View style={styles.header}>

          <View>
            <Text style={styles.title}>
              Notifications
            </Text>

            <Text style={styles.subtitle}>
              Stay updated with your activity
            </Text>
          </View>

          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount}
              </Text>
            </View>
          )}

        </View>

        {/* Mark all */}

        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={markAllAsRead}
            activeOpacity={0.7}>

            <Text style={styles.markAllText}>
              Mark all as read
            </Text>

          </TouchableOpacity>
        )}

        {/* Empty State */}

        {notifications.length === 0 ? (

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyIcon}>
              🔔
            </Text>

            <Text style={styles.emptyTitle}>
              No notifications
            </Text>

            <Text style={styles.emptyMessage}>
              You're all caught up!
            </Text>

          </View>

        ) : (

          <FlatList
            data={notifications}
            keyExtractor={item => item.id}

            renderItem={({item}) => (
              <NotificationCard
                notification={item}
                onPress={markAsRead}
              />
            )}

            showsVerticalScrollIndicator={false}

            contentContainerStyle={
              styles.listContent
            }
          />

        )}

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  header: {
    minHeight: 82,

    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,

    backgroundColor: '#ffffff',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#222222',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#777777',
  },

  badge: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: '#2563eb',

    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },

  markAllButton: {
    alignSelf: 'flex-end',

    marginTop: 10,
    marginRight: 14,
    marginBottom: 4,

    paddingHorizontal: 14,
    paddingVertical: 8,

    backgroundColor: '#ffffff',

    borderRadius: 8,

    borderWidth: 1,
    borderColor: '#2563eb',
  },

  markAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563eb',
  },

  listContent: {
    paddingTop: 5,
    paddingBottom: 25,
  },

  emptyContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 45,
  },

  emptyTitle: {
    marginTop: 14,

    fontSize: 20,
    fontWeight: '700',

    color: '#222222',
  },

  emptyMessage: {
    marginTop: 7,

    fontSize: 14,

    color: '#888888',
  },
});

export default NotificationsScreen;