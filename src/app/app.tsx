import { PaletteMode, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import './app.css';
import { getDesignTokens } from './global-styles';
import { Routes } from './routes';
import React from 'react';
import { StylesProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { useCookies } from 'react-cookie';

export const store = configureAppStore();

export enum ColorMode {
  light = 'light',
  dark = 'dark',
}

export const App = () => {
  const ColorModeContext = React.createContext<any>(undefined);
  const [mode, setMode] = React.useState<PaletteMode>(ColorMode.dark);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === ColorMode.light ? ColorMode.dark : ColorMode.light));
      },
    }),
    [],
  );
  const [cookies, setCookie] = useCookies(['colorMode']);

  React.useEffect(() => {
    if (cookies.colorMode) setMode(cookies.colorMode);
    else setCookie('colorMode', ColorMode.dark);
  }, []);

  React.useEffect(() => {
    if (cookies.colorMode) setMode(cookies.colorMode);
  }, [cookies.colorMode]);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <StylesProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <React.StrictMode>
              <Routes />
            </React.StrictMode>
          </Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StylesProvider>
  );
};
