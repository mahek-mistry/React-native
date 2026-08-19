import React, {
  useState,
} from 'react';

import {
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';

import {
  Note,
} from '../store/notesSlice';

type NoteItemProps = {
  note: Note;
  colors: any;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
};

const NoteItem = ({
  note,
  colors,
  onDelete,
  onFavorite,
}: NoteItemProps) => {

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [selectedVideo, setSelectedVideo] =
    useState<string | null>(null);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.card,
        },
      ]}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
          numberOfLines={1}
        >
          {note.title}
        </Text>

        {/* HEART */}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            onFavorite(note.id)
          }
          style={
            styles.favoriteButton
          }
        >
          <Text
            style={
              styles.favoriteIcon
            }
          >
            {note.isFavorite
              ? '❤️'
              : '♡'}
          </Text>
        </TouchableOpacity>

      </View>

      {/* CONTENT */}

      {note.content ? (
        <Text
          style={[
            styles.content,
            {
              color: colors.text,
            },
          ]}
          numberOfLines={4}
        >
          {note.content}
        </Text>
      ) : null}

      {/* IMAGES */}

      {note.images &&
        note.images.length > 0 && (
          <View
            style={styles.mediaSection}
          >
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              🖼️ Images
            </Text>

            <View
              style={styles.imageRow}
            >
              {note.images.map(
                (image, index) => (
                  <TouchableOpacity
                    key={`${image.uri}-${index}`}
                    onPress={() =>
                      setSelectedImage(
                        image.uri,
                      )
                    }
                  >
                    <Image
                      source={{
                        uri: image.uri,
                      }}
                      style={
                        styles.thumbnail
                      }
                    />
                  </TouchableOpacity>
                ),
              )}
            </View>
          </View>
        )}

      {/* VIDEOS */}

      {note.videos &&
        note.videos.length > 0 && (
          <View
            style={styles.mediaSection}
          >
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              🎥 Videos
            </Text>

            {note.videos.map(
              (video, index) => (
                <TouchableOpacity
                  key={`${video.uri}-${index}`}
                  style={
                    styles.videoButton
                  }
                  onPress={() =>
                    setSelectedVideo(
                      video.uri,
                    )
                  }
                >
                  <Text
                    style={
                      styles.videoText
                    }
                  >
                    ▶️ Video {index + 1}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        )}

      {/* LINKS */}

      {note.links &&
        note.links.length > 0 && (
          <View
            style={styles.mediaSection}
          >
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              🔗 Links
            </Text>

            {note.links.map(
              (link, index) => (
                <TouchableOpacity
                  key={`${link.url}-${index}`}
                  style={
                    styles.linkButton
                  }
                  onPress={() =>
                    Linking.openURL(
                      link.url,
                    )
                  }
                >
                  <Text
                    style={
                      styles.linkName
                    }
                  >
                    🔗 {link.name}
                  </Text>

                  <Text
                    style={
                      styles.linkUrl
                    }
                    numberOfLines={1}
                  >
                    {link.url}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        )}

      {/* DELETE */}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          onDelete(note.id)
        }
        style={
          styles.deleteButton
        }
      >
        <Text
          style={styles.deleteText}
        >
          Delete
        </Text>
      </TouchableOpacity>

      {/* =================================================
          IMAGE FULL SCREEN
      ================================================= */}

      <Modal
        visible={
          selectedImage !== null
        }
        transparent
        animationType="fade"
        onRequestClose={() =>
          setSelectedImage(null)
        }
      >
        <View
          style={
            styles.modalContainer
          }
        >

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() =>
              setSelectedImage(null)
            }
          >
            <Text
              style={
                styles.closeText
              }
            >
              ✕
            </Text>
          </TouchableOpacity>

          {selectedImage && (
            <Image
              source={{
                uri: selectedImage,
              }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}

        </View>
      </Modal>

      {/* =================================================
          VIDEO PLAYER
      ================================================= */}

      <Modal
        visible={
          selectedVideo !== null
        }
        transparent
        animationType="fade"
        onRequestClose={() =>
          setSelectedVideo(null)
        }
      >
        <View
          style={
            styles.modalContainer
          }
        >

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() =>
              setSelectedVideo(null)
            }
          >
            <Text
              style={
                styles.closeText
              }
            >
              ✕
            </Text>
          </TouchableOpacity>

          {selectedVideo && (
            <Video
              source={{
                uri: selectedVideo,
              }}
              style={styles.fullVideo}
              controls
              resizeMode="contain"
            />
          )}

        </View>
      </Modal>

    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 2,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    marginRight: 10,
  },

  favoriteButton: {
    padding: 4,
  },

  favoriteIcon: {
    fontSize: 27,
  },

  content: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    opacity: 0.8,
  },

  mediaSection: {
    marginTop: 14,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },

  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  thumbnail: {
    width: 85,
    height: 85,
    borderRadius: 10,
  },

  videoButton: {
    backgroundColor: '#EEEEEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
  },

  videoText: {
    fontWeight: '700',
    color: '#333',
  },

  linkButton: {
    backgroundColor: '#F0F6FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },

  linkName: {
    color: '#007AFF',
    fontWeight: '700',
  },

  linkUrl: {
    color: '#777',
    fontSize: 12,
    marginTop: 3,
  },

  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  deleteText: {
    color: '#D32F2F',
    fontSize: 13,
    fontWeight: '700',
  },

  modalContainer: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButton: {
    position: 'absolute',
    top: 45,
    right: 20,
    zIndex: 10,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor:
      'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: '700',
  },

  fullImage: {
    width: '100%',
    height: '80%',
  },

  fullVideo: {
    width: '100%',
    height: 300,
  },
});