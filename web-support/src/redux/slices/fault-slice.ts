import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Fault } from '../interfaces'
import { getFault } from '../middleware/fault-middleware'

type FaultState = {
    fault: Fault | null
    loading: boolean
    error: string | null
}

const initialState: FaultState = {
    fault: null,
    loading: false,
    error: null,
}

export const faultSlice = createSlice({
    name: 'fault',
    initialState,
    reducers: {},
    // Add extraReducers if you have async thunks for fault
    extraReducers: (builder) => {
        // Example:
        builder
            .addCase(getFault.pending, (state) => {
                state.loading = true; state.error = null; 
            })
            .addCase(getFault.fulfilled, (state, action) => {
                state.loading = false; state.fault = action.payload; 
            })
            .addCase(getFault.rejected, (state, action) => {
                state.loading = false; state.error = action.error.message || 'Failed to fetch fault'; 
            })
    },
})

export const { } = faultSlice.actions
export default faultSlice.reducer