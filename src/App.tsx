import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FF93B3',
      main: '#FF007A',
      dark: '#B3005C',
    },
    secondary: {
      light: '#CBD5E0',
      main: '#2D3748',
      dark: '#1A202C',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <h2>Hello AWS!</h2>
      </ThemeProvider>
    </>
  );
}

export default App;