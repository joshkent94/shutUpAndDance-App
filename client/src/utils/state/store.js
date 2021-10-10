import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import preLoginReducer from './preLoginSlice';
import { combineReducers } from 'redux';
import userReducer from './userSlice';
import suggestionsReducer from './suggestionsSlice';
import forumReducer from './forumSlice';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  preLogin: preLoginReducer,
  user: userReducer,
  suggestions: suggestionsReducer,
  forum: forumReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);