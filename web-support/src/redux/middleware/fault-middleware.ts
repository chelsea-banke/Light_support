import { createAsyncThunk } from "@reduxjs/toolkit";
import { Fault } from "../interfaces";
import axiosInstance from "../../utils/axiosInstance";

export const getFault = createAsyncThunk<
        Fault,
        {faultId: string},
        { rejectValue: string }
    >
    ('fault/getFault', async (faultId, thunkAPI) => {
        return await axiosInstance.get(`/fault/get?faultId=${faultId}`)
            .then(async (response) =>{
                console.log(response);
                
                return response.data
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response.data)
                    return thunkAPI.rejectWithValue(error.response.data.message || 'Fault Fetch failed')
                } else if (error.request) {
                    console.error('Error request:', error.request)
                    return thunkAPI.rejectWithValue('No response received from the server')
                } else {
                    console.error('Error message:', error.message)
                    return thunkAPI.rejectWithValue('An unexpected error occurred')
                }
            })
    })