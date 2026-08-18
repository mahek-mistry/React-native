import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {getCommentsByPostId} from '../../services/api';

const PostDetailsScreen = ({route, navigation}) => {
  const {post} = route.params;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCommentsByPostId(post.id);

      setComments(data);
    } catch (err) {
      console.log('Comments error:', err);
      setError('Unable to load comments.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    setLiked(previous => !previous);
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Post Details
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* User */}

        <View style={styles.userContainer}>
          <Image
            source={{
              uri:
                post.user?.photoURL ||
                `https://randomuser.me/api/portraits/men/${
                  post.user?.id || 1
                }.jpg`,
            }}
            style={styles.profileImage}
          />

          <View>
            <Text style={styles.userName}>
              {post.user?.name || 'Unknown User'}
            </Text>

            <Text style={styles.username}>
              @{post.user?.username || 'user'}
            </Text>
          </View>
        </View>

        {/* Title */}

        <Text style={styles.title}>
          {post.title}
        </Text>

        {/* Description */}

        <Text style={styles.description}>
          {post.body}
        </Text>

        {/* Post Image */}

        <Image
          source={{
            uri: `https://picsum.photos/600/300?random=${post.id}`,
          }}
          style={styles.postImage}
        />

        {/* Like */}

        <TouchableOpacity
          style={styles.likeButton}
          onPress={handleLike}>

          <Text
            style={[
              styles.likeText,
              liked && styles.likedText,
            ]}>
            {liked ? '♥ Liked' : '♡ Like'}
          </Text>
        </TouchableOpacity>

        {/* Comments Heading */}

        <View style={styles.commentsHeader}>
          <Text style={styles.commentsTitle}>
            Comments
          </Text>

          <Text style={styles.commentCount}>
            {comments.length}
          </Text>
        </View>

        {/* Comments Loading */}

        {loading && (
          <ActivityIndicator
            size="large"
            color="#2563eb"
            style={styles.loader}
          />
        )}

        {/* Comments Error */}

        {!loading && error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error}
            </Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchComments}>
              <Text style={styles.retryText}>
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Empty Comments */}

        {!loading &&
          !error &&
          comments.length === 0 && (
            <Text style={styles.emptyText}>
              No comments yet.
            </Text>
          )}

        {/* Comments */}

        {!loading &&
          !error &&
          comments.map(comment => (
            <View
              key={comment.id}
              style={styles.commentCard}>

              <View style={styles.commentHeader}>
                <Image
                  source={{
                    uri: `https://randomuser.me/api/portraits/women/${
                      (comment.id % 50) + 1
                    }.jpg`,
                  }}
                  style={styles.commentImage}
                />

                <View style={styles.commentUser}>
                  <Text style={styles.commentName}>
                    {comment.name}
                  </Text>

                  <Text style={styles.commentEmail}>
                    {comment.email}
                  </Text>
                </View>
              </View>

              <Text style={styles.commentBody}>
                {comment.body}
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    fontSize: 36,
    color: '#222222',
    lineHeight: 40,
  },

  headerTitle: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
  },

  content: {
    padding: 14,
    paddingBottom: 30,
  },

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  userName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },

  username: {
    marginLeft: 10,
    marginTop: 2,
    fontSize: 13,
    color: '#888888',
  },

  title: {
    marginTop: 18,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222222',
    textTransform: 'capitalize',
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 23,
    color: '#555555',
  },

  postImage: {
    width: '100%',
    height: 210,
    borderRadius: 12,
    marginTop: 15,
  },

  likeButton: {
    marginTop: 14,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  likeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
  },

  likedText: {
    color: '#2563eb',
  },

  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },

  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
  },

  commentCount: {
    marginLeft: 8,
    fontSize: 14,
    color: '#777777',
  },

  loader: {
    marginTop: 25,
  },

  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },

  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  },

  retryButton: {
    marginTop: 12,
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },

  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#777777',
  },

  commentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 13,
    marginBottom: 10,
  },

  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  commentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  commentUser: {
    flex: 1,
    marginLeft: 10,
  },

  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
  },

  commentEmail: {
    marginTop: 2,
    fontSize: 12,
    color: '#888888',
  },

  commentBody: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#555555',
  },
});

export default PostDetailsScreen;