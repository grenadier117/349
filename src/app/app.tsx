import { PaletteMode, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import './app.css';
import { getDesignTokens } from './global-styles';
import { Routes } from './routes';
import React, { createContext } from 'react';
import { StylesProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from 'config/firebaseConfig';
import { Firebase } from './components/firebase';

export const store = configureAppStore();
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const FirebaseContext = createContext<{ firebaseApp: FirebaseApp; firestore: Firestore }>({
  firebaseApp: app,
  firestore: firestore,
});

export enum ColorMode {
  light = 'light',
  dark = 'dark',
}

export const App = () => {
  const ColorModeContext = React.createContext<any>(undefined);
  const [mode, setMode] = React.useState<PaletteMode>(ColorMode.light);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(() => ColorMode.light);
      },
    }),
    [],
  );
  const [cookies, setCookie] = useCookies(['colorMode']);

  React.useEffect(() => {
    if (cookies.colorMode) setMode(cookies.colorMode);
    else setCookie('colorMode', ColorMode.light);
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
            <FirebaseContext.Provider value={{ firebaseApp: app, firestore: firestore }}>
              <Firebase>
                <React.StrictMode>
                  <Routes />
                </React.StrictMode>
              </Firebase>
            </FirebaseContext.Provider>
          </Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StylesProvider>
  );
};
