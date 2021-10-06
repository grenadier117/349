import { PaletteMode } from '@mui/material';
import { amber, grey } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#1a1a1a',
          },
          secondary: {
            main: '#595959',
          },
          background: {
            paper: '#404040',
            default: '#FF0000',
          },
          action: {
            active: '#FFF',
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
    typography: {
      body1: {
        fontSize: '14px',
      },
      body2: {
        fontSize: '12px',
      },
    },
  },
});
