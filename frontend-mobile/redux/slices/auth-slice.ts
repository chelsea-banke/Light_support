// features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { loginClient } from '../middleware/client-auth'
import { logoutUser } from '../middleware/auth'
import { loginFieldTech } from '../middleware/field-tech-auth'

interface AuthState {
    isAuthenticated: boolean
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginClient.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginClient.fulfilled, (state) => {
                state.loading = false
                state.isAuthenticated = true
            })
            .addCase(loginClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(loginFieldTech.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginFieldTech.fulfilled, (state) => {
                state.loading = false
                state.isAuthenticated = true
            })
            .addCase(loginFieldTech.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(logoutUser.fulfilled, () => initialState)
    },
})

export default authSlice.reducer
