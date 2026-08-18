import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {getUser} from '../../utils/storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();

      if (user) {
       navigation.replace('MainTabs');
      } else {
        navigation.replace('Login');
      }
    };

    checkUser();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Social
      </Text>

      <ActivityIndicator
        size="large"
        color="#2563eb"
        style={styles.loader}
      />

      <Text style={styles.loadingText}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  logo: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#2563eb',
  },

  loader: {
    marginTop: 25,
  },

  loadingText: {
    marginTop: 10,
    color: '#777777',
  },
});

export default SplashScreen;