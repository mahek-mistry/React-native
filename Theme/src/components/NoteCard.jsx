import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from
  'react-native-vector-icons/Ionicons';

const NoteCard = ({
  note,
  onPress,
  onFavorite,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}>

      <View style={styles.header}>

        <Text
          style={styles.title}
          numberOfLines={1}>

          {note.title ||
            'Untitled Note'}

        </Text>

        <TouchableOpacity
          style={styles.heartButton}
          onPress={event => {
            event.stopPropagation();
            onFavorite();
          }}>

          <Ionicons
            name={
              note.favorite
                ? 'heart'
                : 'heart-outline'
            }
            size={28}
            color={
              note.favorite
                ? '#FF3B30'
                : '#777'
            }
          />

        </TouchableOpacity>

      </View>

      {note.content ? (
        <Text
          style={styles.content}
          numberOfLines={3}>

          {note.content}

        </Text>
      ) : null}

      {note.images?.length > 0 && (
        <View style={styles.imageRow}>

          <Image
            source={{
              uri:
                note.images[0].uri,
            }}
            style={styles.image}
          />

          {note.images.length > 1 && (
            <View
              style={styles.imageCount}>

              <Text
                style={
                  styles.imageCountText
                }>

                +{note.images.length - 1}

              </Text>

            </View>
          )}

        </View>
      )}

      <View style={styles.footer}>

        {note.images?.length > 0 && (
          <Text style={styles.info}>
            🖼️ {note.images.length}
          </Text>
        )}

        {note.videos?.length > 0 && (
          <Text style={styles.info}>
            🎥 {note.videos.length}
          </Text>
        )}

        {note.links?.length > 0 && (
          <Text style={styles.info}>
            🔗 {note.links.length}
          </Text>
        )}

      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,

    elevation: 3,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  heartButton: {
    padding: 5,
  },

  content: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },

  imageRow: {
    marginTop: 12,
    position: 'relative',
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  imageCount: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#000',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
  },

  imageCountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },

  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },

  info: {
    fontSize: 13,
    color: '#666',
  },
});

export default NoteCard;