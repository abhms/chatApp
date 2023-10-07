import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import orderReducer from './slices/user';

const persistConfigOrder = {
  key: 'user',
  storage,
};


const persistedOrderReducer = persistReducer(persistConfigOrder, orderReducer);

const store = configureStore({
  reducer: {
    order: persistedOrderReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
