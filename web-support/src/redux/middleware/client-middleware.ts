import { createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "../interfaces";
import axiosInstance from "../../utils/axiosInstance";

export const getClient = createAsyncThunk<
        Client,
        {requestId: string},
        { rejectValue: string }
    >
    ('client/getClient', async (requestId, thunkAPI) => {
        return await axiosInstance.get(`/support/get-client?faultId=${requestId}`)
            .then(async (response) =>{
                return response.data
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response.data)
                    return thunkAPI.rejectWithValue(error.response.data.message || 'Client Fetch failed')
                } else if (error.request) {
                    console.error('Error request:', error.request)
                    return thunkAPI.rejectWithValue('No response received from the server')
                } else {
                    console.error('Error message:', error.message)
                    return thunkAPI.rejectWithValue('An unexpected error occurred')
                }
            })
    })