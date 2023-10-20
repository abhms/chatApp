import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/user';
import approved from './slices/approved';
const persistConfigOrder = {
  key: 'user',
  storage,
};
const persistConfigApproved={
  key: 'approved',
  storage,
}

const persisteduserReducer = persistReducer(persistConfigOrder, userReducer);
const persistedapprovedReducer = persistReducer(persistConfigApproved, approved);

const store = configureStore({
  reducer: {
    user: persisteduserReducer,
    approved:persistedapprovedReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
