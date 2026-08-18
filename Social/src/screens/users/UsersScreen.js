import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import {getUsers} from '../../services/api';

import UserCard from '../../components/UserCard';

const UsersScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setError(null);

      const data = await getUsers();

      setUsers(data);
    } catch (err) {
      console.log('Users error:', err);
      setError('Unable to load users.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /*
   * Search users
   */
  const filteredUsers = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (search === '') {
      return users;
    }

    return users.filter(user => {
      const name = user.name?.toLowerCase() || '';
      const username = user.username?.toLowerCase() || '';
      const email = user.email?.toLowerCase() || '';

      return (
        name.includes(search) ||
        username.includes(search) ||
        email.includes(search)
      );
    });
  }, [users, searchText]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const handleUserPress = user => {
    Keyboard.dismiss();

    navigation.navigate('UserDetails', {
      user,
    });
  };

  const clearSearch = () => {
    setSearchText('');
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>
            Loading users...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * Error
   */
  if (error && users.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>

          <Text style={styles.errorTitle}>
            Something went wrong
          </Text>

          <Text style={styles.errorMessage}>
            {error}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchUsers}>

            <Text style={styles.retryText}>
              Try Again
            </Text>

          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>

        {/* Header */}

        <View style={styles.header}>

          <View>
            <Text style={styles.title}>
              Users
            </Text>

            <Text style={styles.subtitle}>
              Discover people in the community
            </Text>
          </View>

          <Text style={styles.totalUsers}>
            {users.length}
          </Text>

        </View>

        {/* Search */}

        <View style={styles.searchContainer}>

          <Text style={styles.searchIcon}>
            🔍
          </Text>

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search by name, username or email"
            placeholderTextColor="#999999"
            style={styles.searchInput}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={clearSearch}
              style={styles.clearButton}>

              <Text style={styles.clearText}>
                ✕
              </Text>

            </TouchableOpacity>
          )}

        </View>

        {/* Search Result */}

        {searchText.length > 0 && (
          <Text style={styles.resultText}>
            {filteredUsers.length}{' '}
            {filteredUsers.length === 1
              ? 'user'
              : 'users'}{' '}
            found
          </Text>
        )}

        {/* Users */}

        {filteredUsers.length === 0 ? (

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyIcon}>
              👥
            </Text>

            <Text style={styles.emptyTitle}>
              No users found
            </Text>

            <Text style={styles.emptyMessage}>
              Try searching with a different name,
              username or email.
            </Text>

          </View>

        ) : (

          <FlatList
            data={filteredUsers}
            keyExtractor={item => item.id.toString()}

            renderItem={({item}) => (
              <UserCard
                user={item}
                onPress={handleUserPress}
              />
            )}

            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }

            showsVerticalScrollIndicator={false}

            keyboardShouldPersistTaps="handled"

            contentContainerStyle={
              styles.listContent
            }
          />

        )}

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  header: {
    minHeight: 82,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222222',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#777777',
  },

  totalUsers: {
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563eb',
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    fontWeight: '700',
    paddingTop: 9,
    overflow: 'hidden',
  },

  searchContainer: {
    height: 52,
    marginHorizontal: 14,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 12,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    height: 50,
    paddingVertical: 0,
    fontSize: 14,
    color: '#222222',
  },

  clearButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearText: {
    fontSize: 16,
    color: '#777777',
  },

  resultText: {
    marginHorizontal: 16,
    marginBottom: 4,
    fontSize: 13,
    color: '#777777',
  },

  listContent: {
    paddingTop: 4,
    paddingBottom: 20,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  loadingText: {
    fontSize: 16,
    color: '#666666',
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
  },

  errorMessage: {
    marginTop: 8,
    textAlign: 'center',
    color: '#777777',
  },

  retryButton: {
    marginTop: 18,
    paddingHorizontal: 25,
    paddingVertical: 11,
    backgroundColor: '#2563eb',
    borderRadius: 9,
  },

  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },

  emptyIcon: {
    fontSize: 42,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 19,
    fontWeight: '700',
    color: '#333333',
  },

  emptyMessage: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    color: '#888888',
  },
});

export default UsersScreen;