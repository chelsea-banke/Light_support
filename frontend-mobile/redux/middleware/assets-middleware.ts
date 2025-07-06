import { createAsyncThunk } from "@reduxjs/toolkit";
import { Asset } from "../interfaces";
import axiosInstance from "@/utils/axiosInstance";

export const getAssets = createAsyncThunk<Asset[]>
    ('assets/getAssets', async (_, thunkAPI) => {
        return await axiosInstance.get('/asset/get-all')
            .then(async (response) =>{
                console.log(response.data);
                return response.data
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response.data)
                    return thunkAPI.rejectWithValue(error.response.data.message || 'Assets Fetch failed')
                } else if (error.request) {
                    console.error('Error request:', error.request)
                    return thunkAPI.rejectWithValue('No response received from the server')
                } else {
                    console.error('Error message:', error.message)
                    return thunkAPI.rejectWithValue('An unexpected error occurred')
                }
            })
    })