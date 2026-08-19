import React, {
  useState,
} from 'react';

import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import {
  useDispatch,
} from 'react-redux';

import {
  addNote,
} from '../store/notesSlice';

import {
  NoteMedia,
  NoteLink,
} from '../types';

const AddNoteScreen = ({
  navigation,
}: any) => {
  const dispatch =
    useDispatch();

  const [title, setTitle] =
    useState('');

  const [content, setContent] =
    useState('');

  const [images, setImages] =
    useState<NoteMedia[]>([]);

  const [videos, setVideos] =
    useState<NoteMedia[]>([]);

  const [links, setLinks] =
    useState<NoteLink[]>([]);

  const [linkName, setLinkName] =
    useState('');

  const [linkUrl, setLinkUrl] =
    useState('');

  // =====================================================
  // GALLERY
  // =====================================================

  const handleGallery = async () => {
    const result =
      await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
        quality: 0.8,
      });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      Alert.alert(
        'Gallery Error',
        result.errorMessage ||
          'Unable to open gallery.',
      );
      return;
    }

    const selectedImages =
      result.assets
        ?.filter(
          item => item.uri,
        )
        .map(item => ({
          uri: item.uri!,
          type: 'image' as const,
          name: item.fileName,
          mimeType: item.type,
        })) || [];

    setImages(previous => [
      ...previous,
      ...selectedImages,
    ]);
  };

  // =====================================================
  // CAMERA
  // =====================================================

  const handleCamera = async () => {
    const result =
      await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
        quality: 0.8,
      });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      Alert.alert(
        'Camera Error',
        result.errorMessage ||
          'Unable to open camera.',
      );
      return;
    }

    const photo =
      result.assets?.[0];

    if (photo?.uri) {
      setImages(previous => [
        ...previous,
        {
          uri: photo.uri,
          type: 'image',
          name: photo.fileName,
          mimeType: photo.type,
        },
      ]);
    }
  };

  // =====================================================
  // VIDEO
  // =====================================================

  const handleVideo = async () => {
    const result =
      await launchImageLibrary({
        mediaType: 'video',
        selectionLimit: 0,
      });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      Alert.alert(
        'Video Error',
        result.errorMessage ||
          'Unable to select video.',
      );
      return;
    }

    const selectedVideos =
      result.assets
        ?.filter(
          item => item.uri,
        )
        .map(item => ({
          uri: item.uri!,
          type: 'video' as const,
          name: item.fileName,
          mimeType: item.type,
        })) || [];

    setVideos(previous => [
      ...previous,
      ...selectedVideos,
    ]);
  };

  // =====================================================
  // ADD LINK
  // =====================================================

  const handleAddLink = () => {
    const name =
      linkName.trim();

    const url =
      linkUrl.trim();

    if (!name) {
      Alert.alert(
        'Link Name',
        'Please enter a name for the link.',
      );
      return;
    }

    if (!url) {
      Alert.alert(
        'Link URL',
        'Please enter a website URL.',
      );
      return;
    }

    let finalUrl = url;

    if (
      !url.startsWith('http://') &&
      !url.startsWith('https://')
    ) {
      finalUrl =
        `https://${url}`;
    }

    setLinks(previous => [
      ...previous,
      {
        name,
        url: finalUrl,
      },
    ]);

    setLinkName('');
    setLinkUrl('');
  };

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const removeImage = (
    index: number,
  ) => {
    setImages(previous =>
      previous.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    );
  };

  // =====================================================
  // REMOVE VIDEO
  // =====================================================

  const removeVideo = (
    index: number,
  ) => {
    setVideos(previous =>
      previous.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    );
  };

  // =====================================================
  // REMOVE LINK
  // =====================================================

  const removeLink = (
    index: number,
  ) => {
    setLinks(previous =>
      previous.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    );
  };

  // =====================================================
  // SAVE NOTE
  // =====================================================

  const handleSave = () => {
    if (
      !title.trim() &&
      !content.trim() &&
      images.length === 0 &&
      videos.length === 0 &&
      links.length === 0
    ) {
      Alert.alert(
        'Empty Note',
        'Please add something to the note.',
      );

      return;
    }

    const now =
      new Date().toISOString();

    dispatch(
      addNote({
        id:
          Date.now().toString(),

        title:
          title.trim(),

        content:
          content.trim(),

        images,

        videos,

        links,

        isFavorite: false,

        createdAt: now,

        updatedAt: now,
      }),
    );

    Alert.alert(
      'Success',
      'Note saved successfully.',
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.goBack(),
        },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.contentContainer
      }
    >
      <Text style={styles.heading}>
        Add Note
      </Text>

      {/* TITLE */}

      <TextInput
        style={styles.titleInput}
        placeholder="Note title"
        value={title}
        onChangeText={setTitle}
      />

      {/* CONTENT */}

      <TextInput
        style={styles.contentInput}
        placeholder="Write your note..."
        multiline
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
      />

      {/* GALLERY + CAMERA */}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.mediaButton}
          onPress={handleGallery}
        >
          <Text
            style={styles.buttonText}
          >
            🖼️ Gallery
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mediaButton}
          onPress={handleCamera}
        >
          <Text
            style={styles.buttonText}
          >
            📷 Camera
          </Text>
        </TouchableOpacity>
      </View>

      {/* VIDEO */}

      <TouchableOpacity
        style={styles.fullButton}
        onPress={handleVideo}
      >
        <Text
          style={styles.buttonText}
        >
          🎥 Add Video
        </Text>
      </TouchableOpacity>

      {/* LINK NAME */}

      <TextInput
        style={styles.input}
        placeholder="Link Name"
        value={linkName}
        onChangeText={setLinkName}
      />

      {/* LINK URL */}

      <View style={styles.linkRow}>
        <TextInput
          style={styles.linkInput}
          placeholder="https://example.com"
          value={linkUrl}
          onChangeText={setLinkUrl}
          autoCapitalize="none"
          keyboardType="url"
        />

        <TouchableOpacity
          style={styles.addLinkButton}
          onPress={handleAddLink}
        >
          <Text
            style={styles.buttonText}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>

      {/* IMAGES */}

      {images.length > 0 && (
        <View>
          <Text
            style={styles.sectionTitle}
          >
            Images
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
          >
            {images.map(
              (image, index) => (
                <View
                  key={`${image.uri}-${index}`}
                  style={
                    styles.imageContainer
                  }
                >
                  <Image
                    source={{
                      uri: image.uri,
                    }}
                    style={styles.image}
                  />

                  <TouchableOpacity
                    style={
                      styles.removeButton
                    }
                    onPress={() =>
                      removeImage(
                        index,
                      )
                    }
                  >
                    <Text
                      style={
                        styles.removeText
                      }
                    >
                      ×
                    </Text>
                  </TouchableOpacity>
                </View>
              ),
            )}
          </ScrollView>
        </View>
      )}

      {/* VIDEOS */}

      {videos.length > 0 && (
        <View>
          <Text
            style={styles.sectionTitle}
          >
            Videos
          </Text>

          {videos.map(
            (video, index) => (
              <View
                key={`${video.uri}-${index}`}
                style={
                  styles.attachment
                }
              >
                <Text
                  style={
                    styles.attachmentText
                  }
                  numberOfLines={1}
                >
                  🎥 Video {index + 1}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    removeVideo(
                      index,
                    )
                  }
                >
                  <Text
                    style={
                      styles.removeLabel
                    }
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          )}
        </View>
      )}

      {/* LINKS */}

      {links.length > 0 && (
        <View>
          <Text
            style={styles.sectionTitle}
          >
            Links
          </Text>

          {links.map(
            (link, index) => (
              <View
                key={`${link.url}-${index}`}
                style={
                  styles.attachment
                }
              >
                <TouchableOpacity
                  style={
                    styles.linkContainer
                  }
                  onPress={() =>
                    Linking.openURL(
                      link.url,
                    )
                  }
                >
                  <Text
                    style={styles.linkName}
                  >
                    🔗 {link.name}
                  </Text>

                  <Text
                    style={styles.linkUrl}
                    numberOfLines={1}
                  >
                    {link.url}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    removeLink(
                      index,
                    )
                  }
                >
                  <Text
                    style={
                      styles.removeLabel
                    }
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          )}
        </View>
      )}

      {/* SAVE */}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text
          style={styles.saveText}
        >
          💾 Save Note
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 50,
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
  },

  titleInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 14,
    fontSize: 18,
    marginBottom: 15,
  },

  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 14,
    marginTop: 15,
  },

  contentInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 14,
    height: 160,
    fontSize: 16,
    marginBottom: 15,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  mediaButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  fullButton: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },

  linkRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  linkInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 14,
  },

  addLinkButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 22,
    marginBottom: 10,
  },

  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },

  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor:
      'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeText: {
    color: '#FFF',
    fontSize: 22,
  },

  attachment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  attachmentText: {
    flex: 1,
  },

  removeLabel: {
    color: 'red',
    marginLeft: 10,
  },

  linkContainer: {
    flex: 1,
  },

  linkName: {
    color: '#007AFF',
    fontWeight: '700',
    fontSize: 15,
  },

  linkUrl: {
    color: '#777',
    fontSize: 12,
    marginTop: 3,
  },

  saveButton: {
    backgroundColor: '#007AFF',
    padding: 17,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },

  saveText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});