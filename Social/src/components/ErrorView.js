import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ErrorView = ({message, onRetry}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Something went wrong
      </Text>

      <Text style={styles.message}>
        {message || 'Unable to load data.'}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onRetry}>
        <Text style={styles.buttonText}>
          Try Again
        </Text>
      </TouchableOpacity>
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
    marginTop: 10,
    textAlign: 'center',
    color: '#777',
  },

  button: {
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ErrorView;