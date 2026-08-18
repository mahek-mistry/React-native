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

import {getUserPosts} from '../../services/api';

const UserDetailsScreen = ({route, navigation}) => {
  const {user} = route.params;

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      setLoadingPosts(true);
      setError(null);

      const data = await getUserPosts(user.id);

      setPosts(data);
    } catch (err) {
      console.log('User posts error:', err);
      setError('Unable to load user posts.');
    } finally {
      setLoadingPosts(false);
    }
  };

  const profileImage = `https://randomuser.me/api/portraits/${
    user.id % 2 === 0 ? 'women' : 'men'
  }/${user.id + 20}.jpg`;

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
          User Details
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* Profile */}

        <View style={styles.profileCard}>

          <Image
            source={{uri: profileImage}}
            style={styles.profileImage}
          />

          <Text style={styles.name}>
            {user.name}
          </Text>

          <Text style={styles.username}>
            @{user.username}
          </Text>

          <Text style={styles.email}>
            {user.email}
          </Text>

          <Text style={styles.phone}>
            📞 {user.phone}
          </Text>

          <Text style={styles.website}>
            🌐 {user.website}
          </Text>

        </View>

        {/* Contact Information */}

        <Text style={styles.sectionTitle}>
          Contact Information
        </Text>

        <View style={styles.infoCard}>

          <Text style={styles.label}>
            Email
          </Text>

          <Text style={styles.value}>
            {user.email}
          </Text>

          <Text style={styles.label}>
            Phone
          </Text>

          <Text style={styles.value}>
            {user.phone}
          </Text>

          <Text style={styles.label}>
            Website
          </Text>

          <Text style={styles.value}>
            {user.website}
          </Text>

        </View>

        {/* Address */}

        <Text style={styles.sectionTitle}>
          Address
        </Text>

        <View style={styles.infoCard}>

          <Text style={styles.value}>
            {user.address.street}
          </Text>

          <Text style={styles.value}>
            {user.address.suite}
          </Text>

          <Text style={styles.value}>
            {user.address.city}
          </Text>

          <Text style={styles.value}>
            ZIP: {user.address.zipcode}
          </Text>

        </View>

        {/* Company */}

        <Text style={styles.sectionTitle}>
          Company
        </Text>

        <View style={styles.infoCard}>

          <Text style={styles.label}>
            Company Name
          </Text>

          <Text style={styles.value}>
            {user.company.name}
          </Text>

          <Text style={styles.label}>
            Catch Phrase
          </Text>

          <Text style={styles.value}>
            {user.company.catchPhrase}
          </Text>

          <Text style={styles.label}>
            Business
          </Text>

          <Text style={styles.value}>
            {user.company.bs}
          </Text>

        </View>

        {/* User Posts */}

        <View style={styles.postsHeader}>
          <Text style={styles.sectionTitle}>
            User Posts
          </Text>

          <Text style={styles.postCount}>
            {posts.length}
          </Text>
        </View>

        {/* Loading */}

        {loadingPosts && (
          <ActivityIndicator
            size="large"
            color="#2563eb"
            style={styles.loader}
          />
        )}

        {/* Error */}

        {!loadingPosts && error && (
          <View style={styles.errorContainer}>

            <Text style={styles.errorText}>
              {error}
            </Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchUserPosts}>

              <Text style={styles.retryText}>
                Try Again
              </Text>

            </TouchableOpacity>

          </View>
        )}

        {/* Empty */}

        {!loadingPosts &&
          !error &&
          posts.length === 0 && (
            <Text style={styles.emptyText}>
              This user has no posts.
            </Text>
          )}

        {/* Posts */}

        {!loadingPosts &&
          !error &&
          posts.map(post => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('PostDetails', {
                  post: {
                    ...post,
                    user: user,
                  },
                })
              }>

              <Text style={styles.postTitle}>
                {post.title}
              </Text>

              <Text style={styles.postBody}>
                {post.body}
              </Text>

              <Text style={styles.readMore}>
                View post →
              </Text>

            </TouchableOpacity>
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

  profileCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 14,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  name: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222222',
  },

  username: {
    marginTop: 3,
    fontSize: 14,
    color: '#2563eb',
  },

  email: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
  },

  phone: {
    marginTop: 5,
    fontSize: 13,
    color: '#777777',
  },

  website: {
    marginTop: 5,
    fontSize: 13,
    color: '#2563eb',
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222222',
  },

  infoCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
  },

  label: {
    marginTop: 8,
    fontSize: 12,
    color: '#888888',
  },

  value: {
    marginTop: 3,
    fontSize: 14,
    color: '#333333',
    lineHeight: 21,
  },

  postsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  postCount: {
    marginTop: 10,
    marginLeft: 8,
    color: '#777777',
  },

  loader: {
    marginTop: 20,
  },

  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },

  errorText: {
    color: '#d32f2f',
  },

  retryButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },

  retryText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777777',
  },

  postCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
    textTransform: 'capitalize',
  },

  postBody: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#666666',
  },

  readMore: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#2563eb',
  },
});

export default UserDetailsScreen;