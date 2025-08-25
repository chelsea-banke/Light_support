import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

import authSlice from './slices/auth-slice'
import userSlice from './slices/user-slice'
import faultsSlice from './slices/faults-slice'
import clientSlice from './slices/client-slice'
import assetsSlice from './slices/assets-slice'
import faultSlice from './slices/fault-slice'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'user', 'faults', 'assets', 'client', 'fault'], // persist only these slices
}

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  faults: faultsSlice,
  assets: assetsSlice,
  client: clientSlice,
  fault: faultSlice,
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