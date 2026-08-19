import React, {useCallback} from 'react';

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {
  useFocusEffect,
  CompositeNavigationProp,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {useTheme} from '../context/ThemeContext';

import {
  RootState,
  AppDispatch,
} from '../store/store';

import {
  deleteNote,
  clearNotes,
  toggleFavorite,
} from '../store/notesSlice';

import NoteItem from '../components/NoteItem';

/* =========================================================
   NAVIGATION TYPES
========================================================= */

type RootStackParamList = {
  Home: undefined;
  AddNote: undefined;
  EditNote: {
    noteId: string;
  };
  Settings: undefined;
  Favorites: undefined;
};

type BottomTabParamList = {
  HomeTab: undefined;
  NotesTab: undefined;
  FavoritesTab: undefined;
  SettingsTab: undefined;
};

/* =========================================================
   NAVIGATION PROP
========================================================= */

type HomeNavigationProp =
  CompositeNavigationProp<
    BottomTabNavigationProp<
      BottomTabParamList,
      'HomeTab'
    >,
    NativeStackNavigationProp<
      RootStackParamList
    >
  >;

type HomeScreenProps = {
  navigation: HomeNavigationProp;
};

/* =========================================================
   HOME SCREEN
========================================================= */

const HomeScreen = ({
  navigation,
}: HomeScreenProps) => {
  const dispatch =
    useDispatch<AppDispatch>();

  const {colors} = useTheme();

  const notes = useSelector(
    (state: RootState) =>
      state.notes.notes,
  );

  /* =====================================================
     SCREEN FOCUS
  ===================================================== */

  useFocusEffect(
    useCallback(() => {
      console.log(
        'Home Screen Focused',
      );

      return () => {
        console.log(
          'Home Screen Unfocused',
        );
      };
    }, []),
  );

  /* =====================================================
     DELETE NOTE
  ===================================================== */

  const handleDelete = (
    id: string,
  ) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(
              deleteNote(id),
            );
          },
        },
      ],
    );
  };

  /* =====================================================
     FAVORITE NOTE
  ===================================================== */

  const handleFavorite = (
    id: string,
  ) => {
    dispatch(
      toggleFavorite(id),
    );
  };

  /* =====================================================
     OPEN EDIT NOTE
  ===================================================== */

  const handleNotePress = (
    id: string,
  ) => {
    navigation.navigate(
      'EditNote',
      {
        noteId: id,
      },
    );
  };

  /* =====================================================
     CLEAR ALL NOTES
  ===================================================== */

  const handleClearAll = () => {
    if (notes.length === 0) {
      return;
    }

    Alert.alert(
      'Clear All Notes',
      'Are you sure you want to delete all notes?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            dispatch(
              clearNotes(),
            );
          },
        },
      ],
    );
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <SafeAreaView
      edges={[
        'top',
        'left',
        'right',
      ]}
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          My Notes
        </Text>

        <View
          style={styles.headerButtons}
        >
          {/* ADD NOTE */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.button,
              {
                backgroundColor:
                  colors.primary,
              },
            ]}
            onPress={() =>
              navigation.navigate(
                'AddNote',
              )
            }
          >
            <Text
              style={styles.buttonText}
            >
              + Add Note
            </Text>
          </TouchableOpacity>

          {/* SETTINGS */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.button,
              {
                backgroundColor:
                  colors.primary,
              },
            ]}
            onPress={() =>
              navigation.navigate(
                'Settings',
              )
            }
          >
            <Text
              style={styles.buttonText}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CLEAR ALL ================= */}

      {notes.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.clearButton}
          onPress={handleClearAll}
        >
          <Text
            style={styles.clearButtonText}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      )}

      {/* ================= EMPTY STATE ================= */}

      {notes.length === 0 ? (
        <View
          style={
            styles.emptyContainer
          }
        >
          <Text
            style={[
              styles.emptyIcon,
              {
                color: colors.primary,
              },
            ]}
          >
            📝
          </Text>

          <Text
            style={[
              styles.emptyText,
              {
                color: colors.text,
              },
            ]}
          >
            No notes yet
          </Text>

          <Text
            style={[
              styles.emptySubText,
              {
                color: colors.text,
              },
            ]}
          >
            Add your first note to
            get started
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.emptyButton,
              {
                backgroundColor:
                  colors.primary,
              },
            ]}
            onPress={() =>
              navigation.navigate(
                'AddNote',
              )
            }
          >
            <Text
              style={
                styles.emptyButtonText
              }
            >
              + Create Note
            </Text>
          </TouchableOpacity>
        </View>
      ) : (

        /* ================= NOTES LIST ================= */

        <FlatList
          data={notes}
          keyExtractor={item =>
            item.id
          }
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.85}
              style={
                styles.noteTouchable
              }
              onPress={() =>
                handleNotePress(
                  item.id,
                )
              }
            >
              <NoteItem
                note={item}
                colors={colors}
                onDelete={
                  handleDelete
                }
                onFavorite={
                  handleFavorite
                }
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={
            styles.list
          }
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    paddingTop: 10,
    marginBottom: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 16,
  },

  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  clearButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  clearButtonText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '700',
  },

  list: {
    paddingTop: 5,
    paddingBottom: 30,
  },

  noteTouchable: {
    marginBottom: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 22,
    fontWeight: '800',
  },

  emptySubText: {
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },

  emptyButton: {
    marginTop: 22,
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 12,
    elevation: 3,
  },

  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});