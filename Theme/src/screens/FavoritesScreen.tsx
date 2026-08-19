import React from 'react';

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  RootState,
  AppDispatch,
} from '../store/store';

import {
  deleteNote,
  toggleFavorite,
} from '../store/notesSlice';

import NoteItem from '../components/NoteItem';

const FavoritesScreen = ({
  navigation,
}: any) => {

  const dispatch =
    useDispatch<AppDispatch>();

  const notes = useSelector(
    (state: RootState) =>
      state.notes.notes,
  );

  const favoriteNotes =
    notes.filter(
      note =>
        note.isFavorite === true,
    );

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

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Favorites ❤️
      </Text>

      {favoriteNotes.length === 0 ? (

        <View style={styles.empty}>

          <Text
            style={
              styles.emptyTitle
            }
          >
            No Favorite Notes
          </Text>

          <Text
            style={
              styles.emptyText
            }
          >
            Tap the ❤️ icon on a note
            to add it here.
          </Text>

        </View>

      ) : (

        <FlatList
          data={favoriteNotes}

          keyExtractor={item =>
            item.id
          }

          contentContainerStyle={
            styles.list
          }

          renderItem={({
            item,
          }) => (

            <NoteItem
              note={item}
              colors={{
                card: '#FFFFFF',
                text: '#222222',
              }}
              onDelete={
                handleDelete
              }
              onFavorite={() =>
                dispatch(
                  toggleFavorite(
                    item.id,
                  ),
                )
              }
            />

          )}
        />

      )}

    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 15,
  },

  list: {
    paddingBottom: 20,
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  emptyText: {
    color: '#777',
    marginTop: 8,
    textAlign: 'center',
  },
});