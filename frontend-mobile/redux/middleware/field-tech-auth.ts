import axiosInstance from '@/utils/axiosInstance'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { secureStore } from '@/utils/secure-store'
import { Client, FieldTech } from '../interfaces'

// Login Thunk
export const loginFieldTech = createAsyncThunk<
    FieldTech, // return type
    { matricule: string; password: string }, // argument
    { rejectValue: string }
>('fieldTech/loginFieldTech', async ({ matricule, password }, thunkAPI) => {
    return await axiosInstance.post('/auth/login-field-tech', { "identifier": matricule, password })
        .then(async (response) => {
            secureStore.setAccessToken(response.data.accessToken)
            secureStore.setRefreshToken(response.data.refreshToken)
            const fieldTechData: FieldTech = new FieldTech(
                response.data.firstName,
                response.data.lastName,
                response.data.identification
            )
            return fieldTechData
        })
        .catch((error) => {
            if (error.response) {
                console.error('Error response:', error.response.data)
                return thunkAPI.rejectWithValue(error.response.data.message || 'Login failed')
            } else if (error.request) {
                console.error('Error request:', error.request)
                return thunkAPI.rejectWithValue('No response received from the server')
            } else {
                console.error('Error message:', error.message)
                return thunkAPI.rejectWithValue('An unexpected error occurred')
            }
        })
})