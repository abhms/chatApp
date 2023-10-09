import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/user';

const persistConfigOrder = {
  key: 'user',
  storage,
};


const persisteduserReducer = persistReducer(persistConfigOrder, userReducer);

const store = configureStore({
  reducer: {
    user: persisteduserReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
