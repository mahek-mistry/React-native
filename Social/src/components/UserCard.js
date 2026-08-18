import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const UserCard = ({user, onPress}) => {
  const imageNumber = ((user.id - 1) % 50) + 1;

  const imageType =
    user.id % 2 === 0 ? 'women' : 'men';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(user)}
      activeOpacity={0.75}>

      <Image
        source={{
          uri: `https://randomuser.me/api/portraits/${imageType}/${imageNumber}.jpg`,
        }}
        style={styles.image}
      />

      <View style={styles.info}>

        <Text
          style={styles.name}
          numberOfLines={1}>
          {user.name}
        </Text>

        <Text
          style={styles.username}
          numberOfLines={1}>
          @{user.username}
        </Text>

        <Text
          style={styles.email}
          numberOfLines={1}>
          {user.email}
        </Text>

        <Text
          style={styles.phone}
          numberOfLines={1}>
          {user.phone}
        </Text>

      </View>

      <Text style={styles.arrow}>
        ›
      </Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',

    marginHorizontal: 12,
    marginVertical: 5,

    paddingHorizontal: 13,
    paddingVertical: 12,

    backgroundColor: '#ffffff',

    borderRadius: 12,

    elevation: 2,

    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eeeeee',
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
  },

  username: {
    marginTop: 2,
    fontSize: 13,
    color: '#2563eb',
  },

  email: {
    marginTop: 4,
    fontSize: 12,
    color: '#666666',
  },

  phone: {
    marginTop: 3,
    fontSize: 11,
    color: '#999999',
  },

  arrow: {
    marginLeft: 8,
    fontSize: 28,
    color: '#aaaaaa',
  },
});

export default UserCard;