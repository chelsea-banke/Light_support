// features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { loginUser, logoutUser } from '../middleware/auth'

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
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(logoutUser.fulfilled, () => initialState)
    },
})

export default authSlice.reducer
