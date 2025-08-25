import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Asset } from '../interfaces'
import { getAssets } from '../middleware/assets-middleware'

type AssetsState = {
    assets: Asset[]
    loading: boolean
    error: string | null
}

const initialState: AssetsState = {
    assets: [],
    loading: false,
    error: null,
}

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        setAssets: (state, action: PayloadAction<Asset[]>) => {
            state.assets = action.payload
        },
        addAsset: (state, action: PayloadAction<Asset>) => {
            state.assets.push(action.payload)
        },
        updateAsset: (state, action: PayloadAction<Asset>) => {
            const index = state.assets.findIndex(f => f.id === action.payload.id)
            if (index !== -1) {
                state.assets[index] = action.payload
            }
        },
        removeAsset: (state, action: PayloadAction<string>) => {
            state.assets = state.assets.filter(f => f.id !== action.payload)
        },
        clearAssets: (state) => {
            state.assets = []
        },
    },
    // Add extraReducers if you have async thunks for assets
    extraReducers: (builder) => {
        // Example:
        builder
            .addCase(getAssets.pending, (state) => {
                state.loading = true; state.error = null; 
            })
            .addCase(getAssets.fulfilled, (state, action) => {
                state.loading = false; state.assets = action.payload; 
            })
            .addCase(getAssets.rejected, (state, action) => {
                state.loading = false; state.error = action.error.message || 'Failed to fetch assets'; 
            })
    },
})

export const { setAssets, addAsset, updateAsset, removeAsset, clearAssets } = assetsSlice.actions
export default assetsSlice.reducer