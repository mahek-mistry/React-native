import React, {useCallback, useEffect, useState} from 'react';

import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {getPosts, getUsers} from '../../services/api';

import PostCard from '../../components/PostCard';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeed = useCallback(async () => {
    try {
      setError(null);

      const [postsData, usersData] = await Promise.all([
        getPosts(),
        getUsers(),
      ]);

      setPosts(postsData);
      setUsers(usersData);
    } catch (err) {
      console.log('Feed error:', err);
      setError('Unable to load your feed.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchFeed();
  };

  const getUserForPost = userId => {
    return users.find(user => user.id === userId);
  };

  const handlePostPress = post => {
    const user = getUserForPost(post.userId);

    navigation.navigate('PostDetails', {
      post: {
        ...post,
        user,
      },
    });
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
        />

        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>
            Loading feed...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * Error
   */
  if (error && posts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
        />

        <View style={styles.centerContainer}>

          <Text style={styles.errorTitle}>
            Something went wrong
          </Text>

          <Text style={styles.errorMessage}>
            {error}
          </Text>

        </View>
      </SafeAreaView>
    );
  }

  /*
   * Empty
   */
  if (posts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
        />

        <View style={styles.container}>

          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>
                Social Feed
              </Text>

              <Text style={styles.headerSubtitle}>
                See what's happening
              </Text>
            </View>
          </View>

          <View style={styles.centerContainer}>
            <Text style={styles.emptyTitle}>
              No posts available
            </Text>

            <Text style={styles.emptyMessage}>
              Pull down to refresh your feed.
            </Text>
          </View>

        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />

      <View style={styles.container}>

        {/* Header */}

        <View style={styles.header}>

          <View>
            <Text style={styles.headerTitle}>
              Social Feed
            </Text>

            <Text style={styles.headerSubtitle}>
              See what's happening
            </Text>
          </View>

          <View style={styles.postBadge}>
            <Text style={styles.postBadgeText}>
              {posts.length}
            </Text>
          </View>

        </View>

        {/* Feed */}

        <FlatList
          data={posts}
          keyExtractor={item =>
            item.id.toString()
          }

          renderItem={({item}) => {
            const user = getUserForPost(
              item.userId,
            );

            return (
              <PostCard
                post={{
                  ...item,
                  user,
                }}
                onPress={() =>
                  handlePostPress(item)
                }
              />
            );
          }}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }

          showsVerticalScrollIndicator={false}

          contentContainerStyle={
            styles.feedContent
          }

          keyboardShouldPersistTaps="handled"
        />

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
    minHeight: 78,

    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,

    backgroundColor: '#ffffff',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#222222',
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 13,
    color: '#777777',
  },

  postBadge: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: '#2563eb',

    justifyContent: 'center',
    alignItems: 'center',
  },

  postBadgeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },

  feedContent: {
    paddingTop: 8,
    paddingBottom: 25,
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
    fontSize: 14,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
  },

  emptyMessage: {
    marginTop: 8,
    textAlign: 'center',
    color: '#777777',
    fontSize: 14,
  },
});

export default HomeScreen;