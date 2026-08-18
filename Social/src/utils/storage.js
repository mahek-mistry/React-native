import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'loggedInUser';

export const saveUser = async user => {
  try {
    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(user),
    );
  } catch (error) {
    console.log('Error saving user:', error);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  } catch (error) {
    console.log('Error getting user:', error);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.log('Error removing user:', error);
  }
};