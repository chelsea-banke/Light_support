import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'

import authSlice from './slices/auth-slice'
import clientSlice from './slices/client-slice'
import faultsSlice from './slices/faults-slice'
import fieldTechSlice from './slices/field-tech-slice'
import assetsReducer from './slices/assets-slice'
import ticketsReducer from './slices/tickets-slice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'client', 'faults', 'assets', 'tickets', 'fieldTech'], // persist only these slices
}

const rootReducer = combineReducers({
  auth: authSlice,
  client: clientSlice,
  faults: faultsSlice,
  assets: assetsReducer,
  tickets: ticketsReducer,
  fieldTech: fieldTechSlice
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