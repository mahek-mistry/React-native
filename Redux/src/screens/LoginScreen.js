import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {useDispatch} from 'react-redux';

import {login} from '../redux/slices/authSlice';
import {saveUserEmail} from '../utils/storage';

import CustomButton from '../components/CustomButton';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '442877474550-8fdfrbevt9urtmsge1pa4dms2jjp4uq6.apps.googleusercontent.com',
});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = value => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleLogin = async () => {
    let valid = true;

    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    if (!valid) {
      return;
    }

    if (
      email.trim().toLowerCase() === 'name@test.com' &&
      password === '123456'
    ) {
      dispatch(
        login({
          email: email.trim().toLowerCase(),
        }),
      );

      await saveUserEmail(email.trim().toLowerCase());

      navigation.replace('Home');
    } else {
      Alert.alert(
        'Login Failed',
        'Invalid email or password',
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();

      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('Google ID token not found');
      }

      const googleCredential =
        auth.GoogleAuthProvider.credential(idToken);

      const userCredential =
        await auth().signInWithCredential(googleCredential);

      const userEmail = userCredential.user.email;

      dispatch(
        login({
          email: userEmail,
        }),
      );

      await saveUserEmail(userEmail);

      navigation.replace('Home');
    } catch (error) {
      console.log('Google Login Error:', error);

      Alert.alert(
        'Google Login Failed',
        error?.message || 'Unable to login with Google.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <View style={styles.logoCircle}>
            <Text style={styles.logo}>🔐</Text>
          </View>

          <Text style={styles.title}>
            Redux Assignment
          </Text>

          <Text style={styles.subtitle}>
            Sign in to continue
          </Text>

          <Text style={styles.label}>
            Email Address
          </Text>

          <View
            style={[
              styles.inputContainer,
              emailError ? styles.errorBorder : null,
            ]}>
            <Text style={styles.icon}>
              @
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {emailError ? (
            <Text style={styles.errorText}>
              {emailError}
            </Text>
          ) : null}

          <Text style={styles.label}>
            Password
          </Text>

          <View
            style={[
              styles.inputContainer,
              passwordError ? styles.errorBorder : null,
            ]}>
            <Text style={styles.icon}>
              🔒
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() =>
                setShowPassword(!showPassword)
              }
              activeOpacity={0.7}>
              <Text style={styles.eye}>
                {showPassword ? '👁' : '👁️'}
              </Text>
            </TouchableOpacity>
          </View>

          {passwordError ? (
            <Text style={styles.errorText}>
              {passwordError}
            </Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Login"
              onPress={handleLogin}
            />
          </View>

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}>
            <Text style={styles.googleIcon}>
              G
            </Text>

            <Text style={styles.googleButtonText}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>
              Demo Credentials
            </Text>

            <Text style={styles.info}>
              Email: name@test.com
            </Text>

            <Text style={styles.info}>
              Password: 123456
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },

  box: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  logoCircle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },

  logo: {
    fontSize: 28,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },

  inputContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    marginBottom: 5,
  },

  errorBorder: {
    borderColor: '#EF4444',
  },

  icon: {
    width: 42,
    textAlign: 'center',
    fontSize: 18,
    color: '#6B7280',
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    paddingHorizontal: 5,
    color: '#000000',
  },

  eyeButton: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  eye: {
    fontSize: 20,
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginBottom: 15,
    marginLeft: 2,
  },

  buttonContainer: {
    marginTop: 10,
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  orText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },

  googleButton: {
    height: 54,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    marginRight: 10,
  },

  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },

  demoBox: {
    marginTop: 22,
    padding: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
  },

  demoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },

  info: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 3,
  },
});

export default LoginScreen;