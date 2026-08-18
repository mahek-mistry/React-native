import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const UserCard = ({user, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{user.name}</Text>

      <Text style={styles.email}>{user.email}</Text>

      <Text style={styles.company}>
        Company: {user.company.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },

  email: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },

  company: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
  },
});

export default UserCard;