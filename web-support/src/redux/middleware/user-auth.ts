import axiosInstance from '../../utils/axiosInstance'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { localStore } from '../../utils/localStore'
import { User } from '../interfaces'

// Login Thunk
export const loginUser = createAsyncThunk<
    User, // return type
    { matricule: string; password: string }, // argument
    { rejectValue: string }
>('user/loginUser', async ({ matricule, password }, thunkAPI) => {
    return await axiosInstance.post('/auth/login-support', { "identifier":matricule, password })
        .then(async (response) => {
            localStore.setAccessToken(response.data.accessToken)
            localStore.setRefreshToken(response.data.refreshToken)
            const userData: User = new User(
                response.data.firstName,
                response.data.lastName,
                response.data.identifier
            )
            return userData
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