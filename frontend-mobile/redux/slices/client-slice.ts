import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginClient } from "../middleware/client-auth"
import { logoutUser } from '../middleware/auth'
import { Client } from '../interfaces'

type ClientState = {
    client: Client | null
    loading: boolean
    error: string | null
}

const initialState: ClientState = {
    client: null,
    loading: false,
    error: null,
}

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClient: (state, action: PayloadAction<Client>) => {
            state.client = action.payload
        },
        clearClient: (state) => {
            state.client = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.client = null
            })
            .addCase(loginClient.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginClient.fulfilled, (state, action) => {
                state.loading = false
                state.client = action.payload
            })
            .addCase(loginClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? 'Login failed'
            })

    },
})

export const { setClient, clearClient } = clientSlice.actions
export default clientSlice.reducer
