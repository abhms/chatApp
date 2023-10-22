import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}
