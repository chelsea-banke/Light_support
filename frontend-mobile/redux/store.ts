// store/index.ts or store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user-slice'

const rootReducer = combineReducers({
    user: userReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
