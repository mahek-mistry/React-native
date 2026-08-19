import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../types';

const themes: ThemeType[] = [
  'red',
  'green',
  'blue',
  'yellow',
];

const SettingsScreen = () => {
  const { theme, colors, setTheme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: colors.text },
        ]}
      >
        Theme
      </Text>

      {themes.map(item => (
        <TouchableOpacity
          key={item}
          style={[
            styles.themeButton,
            {
              borderColor: colors.border,
            },
          ]}
          onPress={() => setTheme(item)}
        >
          <View
            style={[
              styles.radio,
              {
                borderColor: colors.primary,
              },
            ]}
          >
            {theme === item && (
              <View
                style={[
                  styles.radioSelected,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            )}
          </View>

          <Text
            style={[
              styles.themeText,
              { color: colors.text },
            ]}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}

      <Text
        style={[
          styles.currentTheme,
          { color: colors.primary },
        ]}
      >
        Current Theme: {theme}
      </Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
  },

  radio: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  themeText: {
    fontSize: 17,
  },

  currentTheme: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
  },
});