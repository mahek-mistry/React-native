import React, {useEffect, useState} from 'react';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {useDispatch, useSelector} from 'react-redux';

import {
  RootStackParamList,
} from '../types';

import {
  RootState,
  AppDispatch,
} from '../store/store';

import {
  updateNote,
} from '../store/notesSlice';

import {useTheme} from '../context/ThemeContext';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'EditNote'
>;

const EditNoteScreen = ({
  navigation,
  route,
}: Props) => {
  const dispatch =
    useDispatch<AppDispatch>();

  const {colors} = useTheme();

  /*
   * Get noteId from navigation
   */
  const noteId = route.params?.noteId;

  /*
   * Find note from Redux
   */
  const note = useSelector(
    (state: RootState) =>
      state.notes.notes.find(
        item => item.id === noteId,
      ),
  );

  /*
   * Form state
   */
  const [title, setTitle] =
    useState('');

  const [content, setContent] =
    useState('');

  /*
   * Load note into form
   */
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  /*
   * If note does not exist
   */
  if (!note) {
    return (
      <View
        style={[
          styles.errorContainer,
          {
            backgroundColor:
              colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.errorTitle,
            {
              color: colors.text,
            },
          ]}
        >
          Note not found
        </Text>

        <Text
          style={[
            styles.errorText,
            {
              color: colors.text,
            },
          ]}
        >
          This note could not be found.
        </Text>

        <TouchableOpacity
          style={[
            styles.backButton,
            {
              backgroundColor:
                colors.primary,
            },
          ]}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text style={styles.backButtonText}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /*
   * Save changes
   */
  const handleUpdate = () => {
    if (!title.trim()) {
      Alert.alert(
        'Required',
        'Please enter a note title.',
      );
      return;
    }

    const updatedNote = {
      ...note,

      title: title.trim(),

      content: content.trim(),

      updatedAt: new Date().toISOString(),
    };

    dispatch(
      updateNote(updatedNote),
    );

    Alert.alert(
      'Success',
      'Note updated successfully.',
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
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
      contentContainerStyle={
        styles.contentContainer
      }
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}

      <Text
        style={[
          styles.heading,
          {
            color: colors.text,
          },
        ]}
      >
        Edit Note
      </Text>

      {/* Title */}

      <Text
        style={[
          styles.label,
          {
            color: colors.text,
          },
        ]}
      >
        Title
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter note title"
        placeholderTextColor="#999"
        style={[
          styles.input,
          {
            color: colors.text,
            borderColor: colors.border,
            backgroundColor:
              colors.card,
          },
        ]}
      />

      {/* Content */}

      <Text
        style={[
          styles.label,
          {
            color: colors.text,
          },
        ]}
      >
        Content
      </Text>

      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Write your note..."
        placeholderTextColor="#999"
        multiline
        textAlignVertical="top"
        style={[
          styles.contentInput,
          {
            color: colors.text,
            borderColor: colors.border,
            backgroundColor:
              colors.card,
          },
        ]}
      />

      {/* Existing Images */}

      {note.images &&
        note.images.length > 0 && (
          <View style={styles.mediaSection}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                },
              ]}
            >
              Images
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
            >
              {note.images.map(
                (image, index) => (
                  <Image
                    key={`${image.uri}-${index}`}
                    source={{
                      uri: image.uri,
                    }}
                    style={
                      styles.previewImage
                    }
                  />
                ),
              )}
            </ScrollView>
          </View>
        )}

      {/* Existing Videos */}

      {note.videos &&
        note.videos.length > 0 && (
          <View style={styles.mediaSection}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                },
              ]}
            >
              Videos
            </Text>

            <Text
              style={[
                styles.mediaInfo,
                {
                  color: colors.text,
                },
              ]}
            >
              {note.videos.length}{' '}
              video(s) attached
            </Text>
          </View>
        )}

      {/* Existing Links */}

      {note.links &&
        note.links.length > 0 && (
          <View style={styles.mediaSection}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                },
              ]}
            >
              Links
            </Text>

            {note.links.map(
              (link, index) => (
                <Text
                  key={`${link}-${index}`}
                  style={[
                    styles.linkText,
                    {
                      color:
                        colors.primary,
                    },
                  ]}
                >
                  🔗 {link}
                </Text>
              ),
            )}
          </View>
        )}

      {/* Save Button */}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.saveButton,
          {
            backgroundColor:
              colors.primary,
          },
        ]}
        onPress={handleUpdate}
      >
        <Text style={styles.saveButtonText}>
          Save Changes
        </Text>
      </TouchableOpacity>

      {/* Cancel Button */}

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cancelButton}
        onPress={() =>
          navigation.goBack()
        }
      >
        <Text style={styles.cancelButtonText}>
          Cancel
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    marginBottom: 18,
  },

  contentInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    minHeight: 150,
    marginBottom: 20,
  },

  mediaSection: {
    marginTop: 10,
    marginBottom: 20,
  },

  previewImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    marginRight: 10,
  },

  mediaInfo: {
    fontSize: 14,
    opacity: 0.7,
  },

  linkText: {
    fontSize: 14,
    marginBottom: 8,
  },

  saveButton: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  cancelButton: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#999',
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  errorTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },

  errorText: {
    fontSize: 15,
    opacity: 0.7,
    marginBottom: 25,
  },

  backButton: {
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 12,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});