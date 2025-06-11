import axiosInstance from '@/utils/axiosInstance'
import { createAsyncThunk } from '@reduxjs/toolkit'

// Mock user type — keep in sync with userSlice
export type User = {
    fistName: string
    lastName: string
    contact: string
    accessToken: string
    refreshToken: string
}

// Login Thunk
export const loginUser = createAsyncThunk<
    User, // return type
    { contact: string; password: string }, // argument
    { rejectValue: string }
>('user/loginUser', async ({ contact, password }, thunkAPI) => {
    return await axiosInstance.post('/auth/client-login', { contact, password })
        .then((response) => {
            return response.data
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

// Logout Thunk
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    await new Promise((res) => setTimeout(res, 500)) // Simulate async call
    return
})