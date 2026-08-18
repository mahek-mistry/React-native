import React, {useEffect, useMemo, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {fetchUsers} from '../redux/slices/userSlice';

import {logout} from '../redux/slices/authSlice';

import {removeUserEmail} from '../utils/storage';

import UserCard from '../components/UserCard';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {users, loading, error} = useSelector(
    state => state.users,
  );

  const {user} = useSelector(
    state => state.auth,
  );

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return users;
    }

    return users.filter(item =>
      item.name.toLowerCase().includes(searchText),
    );
  }, [users, search]);

  const handleLogout = async () => {
    await removeUserEmail();

    dispatch(logout());

    navigation.replace('Login');
  };

  const handleRetry = () => {
    dispatch(fetchUsers());
  };

  const renderUser = ({item}) => {
    return (
      <UserCard
        user={item}
        onPress={() =>
          navigation.navigate('Posts', {
            userId: item.id,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Users</Text>

          <Text style={styles.email}>
            {user?.email}
          </Text>
        </View>

        <CustomButton
          title="Logout"
          onPress={handleLogout}
        />
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search users..."
        value={search}
        onChangeText={setSearch}
      />

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Loading...
          </Text>
        </View>
      )}

      {error && !loading && (
        <View style={styles.center}>
          <Text style={styles.error}>
            Something went wrong
          </Text>

          <CustomButton
            title="Retry"
            onPress={handleRetry}
          />
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id.toString()}
          renderItem={renderUser}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No users found
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  email: {
    color: '#666',
    marginTop: 3,
  },

  search: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  loadingText: {
    marginTop: 10,
  },

  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
  },
});

export default HomeScreen;