import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const PostCard = ({post, onPress}) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(previous => !previous);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(post)}>
      
      <View style={styles.header}>
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

        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {post.user?.name || 'Unknown User'}
          </Text>

          <Text style={styles.username}>
            @{post.user?.username || 'user'}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>
        {post.title}
      </Text>

      <Text style={styles.body}>
        {post.body}
      </Text>

      <Image
        source={{
          uri: `https://picsum.photos/600/300?random=${post.id}`,
        }}
        style={styles.postImage}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleLike}
          style={styles.actionButton}>
          <Text
            style={[
              styles.actionText,
              liked && styles.liked,
            ]}>
            {liked ? '♥ Liked' : '♡ Like'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.actionText}>
          💬 {post.id + 5} Comments
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 7,
    borderRadius: 12,
    padding: 14,
    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 23,
  },

  userInfo: {
    marginLeft: 10,
  },

  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },

  username: {
    marginTop: 2,
    fontSize: 12,
    color: '#888',
  },

  title: {
    marginTop: 14,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    textTransform: 'capitalize',
  },

  body: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#555',
  },

  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginTop: 12,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  actionButton: {
    paddingVertical: 4,
  },

  actionText: {
    fontSize: 14,
    color: '#555',
  },

  liked: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
});

export default PostCard;