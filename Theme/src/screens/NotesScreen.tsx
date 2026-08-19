import React from 'react';

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Ionicons from
  'react-native-vector-icons/Ionicons';

import NoteCard from
  '../components/NoteCard';

import {
  RootState,
} from '../store/store';

import {
  toggleFavorite,
} from '../store/notesSlice';

const NotesScreen = ({
  navigation,
}: any) => {

  const dispatch = useDispatch();

  const notes = useSelector(
    (state: RootState) =>
      state.notes.notes,
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          Notes
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation
              .getParent()
              ?.navigate('AddNote')
          }>

          <Ionicons
            name="add"
            size={28}
            color="#FFF"
          />

        </TouchableOpacity>

      </View>

      {notes.length === 0 ? (

        <View style={styles.empty}>

          <Ionicons
            name="document-text-outline"
            size={70}
            color="#BBB"
          />

          <Text
            style={styles.emptyTitle}>
            No Notes
          </Text>

          <Text
            style={styles.emptyText}>
            Tap + to create your first note.
          </Text>

        </View>

      ) : (

        <FlatList
          data={notes}
          keyExtractor={item =>
            item.id
          }
          contentContainerStyle={
            styles.list
          }
          renderItem={({item}) => (

            <NoteCard
              note={item}
              onPress={() =>
                navigation
                  .getParent()
                  ?.navigate(
                    'EditNote',
                    {
                      note: item,
                    },
                  )
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 15,
    backgroundColor: '#FFF',
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#222',
  },

  addButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    padding: 15,
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: '700',
    marginTop: 15,
  },

  emptyText: {
    color: '#777',
    marginTop: 6,
  },
});

export default NotesScreen;