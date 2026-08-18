import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyState = ({message = 'No posts found'}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nothing here</Text>

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },

  message: {
    marginTop: 8,
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
  },
});

export default EmptyState;