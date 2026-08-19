import React from 'react';
import {Provider} from 'react-redux';

import {store} from './src/store/store';
import NotesPersistence from './src/store/NotesPersistence';
import AppNavigator from './src/navigation/AppNavigator';

import {ThemeProvider} from './src/context/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NotesPersistence />
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;