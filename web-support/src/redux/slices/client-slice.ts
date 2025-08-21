import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Client } from '../interfaces'
import { getClient } from '../middleware/client-middleware'

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
    // Add extraReducers if you have async thunks for client
    extraReducers: (builder) => {
        // Example:
        builder
            .addCase(getClient.pending, (state) => {
                state.loading = true; state.error = null; 
            })
            .addCase(getClient.fulfilled, (state, action) => {
                state.loading = false; state.client = action.payload; 
            })
            .addCase(getClient.rejected, (state, action) => {
                state.loading = false; state.error = action.error.message || 'Failed to fetch client'; 
            })
    },
})

export const { setClient, clearClient } = clientSlice.actions
export default clientSlice.reducer