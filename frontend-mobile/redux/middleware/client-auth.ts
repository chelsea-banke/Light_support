import axiosInstance from '@/utils/axiosInstance'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { secureStore } from '@/utils/secure-store'
import { router } from 'expo-router'
import { Client } from '../interfaces'

// Login Thunk
export const loginClient = createAsyncThunk<
    Client, // return type
    { contact: string; password: string }, // argument
    { rejectValue: string }
>('client/loginClient', async ({ contact, password }, thunkAPI) => {
    return await axiosInstance.post('/auth/login-client', { "identifier":contact, password })
        .then(async (response) => {
            secureStore.setAccessToken(response.data.accessToken)
            secureStore.setRefreshToken(response.data.refreshToken)
            const clientData: Client = new Client(
                response.data.firstName,
                response.data.lastName,
                response.data.identifier
            )
            return clientData
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