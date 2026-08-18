import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_EMAIL = 'USER_EMAIL';

export const saveUserEmail = async email => {
  try {
    await AsyncStorage.setItem(USER_EMAIL, email);
  } catch (error) {
    console.log('Error saving email:', error);
  }
};

export const getUserEmail = async () => {
  try {
    return await AsyncStorage.getItem(USER_EMAIL);
  } catch (error) {
    console.log('Error getting email:', error);
    return null;
  }
};

export const removeUserEmail = async () => {
  try {
    await AsyncStorage.removeItem(USER_EMAIL);
  } catch (error) {
    console.log('Error removing email:', error);
  }
};