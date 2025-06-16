import { createAsyncThunk } from "@reduxjs/toolkit";
import { Fault } from "../interfaces";
import axiosInstance from "@/utils/axiosInstance";

export const getFaults = createAsyncThunk<Fault[]>
    ('faults/getFaults', async (_, thunkAPI) => {
        return await axiosInstance.get('/fault/get-all')
            .then(async (response) =>{
                return response.data
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response.data)
                    return thunkAPI.rejectWithValue(error.response.data.message || 'Faults Fetch failed')
                } else if (error.request) {
                    console.error('Error request:', error.request)
                    return thunkAPI.rejectWithValue('No response received from the server')
                } else {
                    console.error('Error message:', error.message)
                    return thunkAPI.rejectWithValue('An unexpected error occurred')
                }
            })
    })