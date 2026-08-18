import React, {useEffect} from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {
  fetchPosts,
  clearPosts,
} from '../redux/slices/postSlice';

import CustomButton from '../components/CustomButton';

const PostsScreen = ({route}) => {
  const {userId} = route.params;

  const dispatch = useDispatch();

  const {posts, loading, error} = useSelector(
    state => state.posts,
  );

  useEffect(() => {
    dispatch(fetchPosts(userId));

    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch, userId]);

  const handleRetry = () => {
    dispatch(fetchPosts(userId));
  };

  const renderPost = ({item}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.body}>
          {item.body}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loading}>
          Loading...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          Something went wrong
        </Text>

        <CustomButton
          title="Retry"
          onPress={handleRetry}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Posts of User {userId}
      </Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  body: {
    marginTop: 8,
    color: '#555',
    lineHeight: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  loading: {
    marginTop: 10,
  },

  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default PostsScreen;