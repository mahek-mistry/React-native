import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />

      <View style={styles.container}>

        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.title}>
            Profile
          </Text>
        </View>

        {/* Profile */}

        <View style={styles.profileSection}>

          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/women/44.jpg',
            }}
            style={styles.profileImage}
          />

          <Text style={styles.name}>
            Social User
          </Text>

          <Text style={styles.email}>
            user@example.com
          </Text>

        </View>

        {/* Statistics */}

        <View style={styles.statsContainer}>

          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              24
            </Text>

            <Text style={styles.statLabel}>
              Posts
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              120
            </Text>

            <Text style={styles.statLabel}>
              Followers
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              85
            </Text>

            <Text style={styles.statLabel}>
              Following
            </Text>
          </View>

        </View>

        {/* Edit Profile */}

        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}>

          <Text style={styles.editText}>
            Edit Profile
          </Text>

        </TouchableOpacity>

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
    height: 70,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#222222',
  },

  profileSection: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 25,
    backgroundColor: '#ffffff',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2563eb',
  },

  name: {
    marginTop: 14,
    fontSize: 21,
    fontWeight: '700',
    color: '#222222',
  },

  email: {
    marginTop: 5,
    fontSize: 14,
    color: '#777777',
  },

  statsContainer: {
    marginTop: 12,
    marginHorizontal: 12,
    paddingVertical: 18,

    backgroundColor: '#ffffff',
    borderRadius: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  stat: {
    flex: 1,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#777777',
  },

  divider: {
    width: 1,
    height: 35,
    backgroundColor: '#dddddd',
  },

  editButton: {
    marginTop: 18,
    marginHorizontal: 12,
    height: 48,

    borderRadius: 10,

    backgroundColor: '#2563eb',

    alignItems: 'center',
    justifyContent: 'center',
  },

  editText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default ProfileScreen;