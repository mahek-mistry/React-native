import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from './store';
import {setNotes} from './notesSlice';

const NOTES_KEY = '@my_notes';

const NotesPersistence = () => {
  const dispatch = useDispatch();

  const notes = useSelector(
    (state: RootState) => state.notes.notes,
  );

  // Load notes when app starts
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem(NOTES_KEY);

        if (savedNotes) {
          dispatch(setNotes(JSON.parse(savedNotes)));
        }
      } catch (error) {
        console.log('Error loading notes:', error);
      }
    };

    loadNotes();
  }, [dispatch]);

  // Save notes whenever notes change
  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem(
          NOTES_KEY,
          JSON.stringify(notes),
        );
      } catch (error) {
        console.log('Error saving notes:', error);
      }
    };

    saveNotes();
  }, [notes]);

  return null;
};

export default NotesPersistence;