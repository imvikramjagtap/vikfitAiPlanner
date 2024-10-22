import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import your reducers here
import mealPlannerReducer from './mealPlannerSlice';

const rootReducer = combineReducers({
  mealPlanner: mealPlannerReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const makeStore = () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  return store;
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];