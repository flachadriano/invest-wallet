import { createTheme, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';

interface IColorModeContext {
  mode: string;
  toggleMode: () => void;
}

export const ColorModeContext = React.createContext<IColorModeContext>(null!);

interface IColorProvider {
  children: JSX.Element
}

export const ColorProvider = ({ children }: IColorProvider) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const theme = createTheme({
    palette: {
      mode
    }
  });

  return (
    <ColorModeContext.Provider value={{
      mode,
      toggleMode
    }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
