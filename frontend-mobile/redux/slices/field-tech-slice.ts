import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginFieldTech } from "../middleware/field-tech-auth"
import { logoutUser } from '../middleware/auth'
import { FieldTech } from '../interfaces'

type FieldTechState = {
    fieldTech: FieldTech | null
    loading: boolean
    error: string | null
}

const initialState: FieldTechState = {
    fieldTech: null,
    loading: false,
    error: null,
}

export const fieldTechSlice = createSlice({
    name: 'fieldTech',
    initialState,
    reducers: {
        setFieldTech: (state, action: PayloadAction<FieldTech>) => {
            state.fieldTech = action.payload
        },
        clearFieldTech: (state) => {
            state.fieldTech = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.fieldTech = null
            })
            .addCase(loginFieldTech.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginFieldTech.fulfilled, (state, action) => {
                state.loading = false
                state.fieldTech = action.payload
            })
            .addCase(loginFieldTech.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? 'Login failed'
            })

    },
})

export const { setFieldTech, clearFieldTech } = fieldTechSlice.actions
export default fieldTechSlice.reducer