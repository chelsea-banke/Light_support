import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Fault } from '../interfaces'
import { getFaults } from '../middleware/faults-middleware'

type FaultsState = {
    faults: Fault[]
    loading: boolean
    error: string | null
}

const initialState: FaultsState = {
    faults: [],
    loading: false,
    error: null,
}

export const faultsSlice = createSlice({
    name: 'faults',
    initialState,
    reducers: {
        setFaults: (state, action: PayloadAction<Fault[]>) => {
            state.faults = action.payload
        },
        addFault: (state, action: PayloadAction<Fault>) => {
            state.faults.push(action.payload)
        },
        updateFault: (state, action: PayloadAction<Fault>) => {
            const index = state.faults.findIndex(f => f.id === action.payload.id)
            if (index !== -1) {
                state.faults[index] = action.payload
            }
        },
        removeFault: (state, action: PayloadAction<string>) => {
            state.faults = state.faults.filter(f => f.id !== action.payload)
        },
        clearFaults: (state) => {
            state.faults = []
        },
    },
    // Add extraReducers if you have async thunks for faults
    extraReducers: (builder) => {
        // Example:
        builder
            .addCase(getFaults.pending, (state) => {
                state.loading = true; state.error = null; 
            })
            .addCase(getFaults.fulfilled, (state, action) => {
                state.loading = false; state.faults = action.payload; 
            })
            .addCase(getFaults.rejected, (state, action) => {
                state.loading = false; state.error = action.error.message || 'Failed to fetch faults'; 
            })
    },
})

export const { setFaults, addFault, updateFault, removeFault, clearFaults } = faultsSlice.actions
export default faultsSlice.reducer
