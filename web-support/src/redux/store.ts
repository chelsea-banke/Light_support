import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

import authSlice from './slices/auth-slice'
import userSlice from './slices/user-slice'
import faultsSlice from './slices/faults-slice'
import clientSlice from './slices/client-slice'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'user', 'faults', 'client'], // persist only these slices
}

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  faults: faultsSlice,
  client: clientSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch