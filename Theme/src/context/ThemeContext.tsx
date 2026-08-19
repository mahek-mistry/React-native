import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type ThemeColors = {
  background: string;
  text: string;
  primary: string;
  card: string;
  border: string;
};

type ThemeContextType = {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
};

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  text: '#222222',
  primary: '#F4516C',
  card: '#F5F5F5',
  border: '#DDDDDD',
};

const darkColors: ThemeColors = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#F4516C',
  card: '#1E1E1E',
  border: '#333333',
};

const ThemeContext =
  createContext<ThemeContextType | undefined>(
    undefined,
  );

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({
  children,
}: ThemeProviderProps) => {
  const [isDark, setIsDark] =
    useState(false);

  const colors = isDark
    ? darkColors
    : lightColors;

  const toggleTheme = () => {
    setIsDark(previous => !previous);
  };

  return (
    <ThemeContext.Provider
      value={{
        colors,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used inside ThemeProvider',
    );
  }

  return context;
};