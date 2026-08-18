import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    navigation.replace('MainTabs');
  }, 1000);
};
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Social</Text>

        <Text style={styles.subtitle}>
          Connect with your community
        </Text>
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.googleButtonText}>
            Continue with Google
          </Text>
        )}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Connect • Share • Discover
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#ffffff',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },

  logo: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#2563eb',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },

  googleButton: {
    width: '100%',
    height: 52,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  footerText: {
    marginTop: 30,
    color: '#999999',
    fontSize: 13,
  },
});

export default LoginScreen;