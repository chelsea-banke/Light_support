import { createAsyncThunk } from "@reduxjs/toolkit";
import { Ticket } from "../interfaces";
import axiosInstance from "@/utils/axiosInstance";

export const getTickets = createAsyncThunk<Ticket[]>
    ('tickets/getTickets', async (_, thunkAPI) => {
        return await axiosInstance.get('/ticket/get-all')
            .then(async (response) =>{
                console.log(response.data);
                return response.data
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response.data)
                    return thunkAPI.rejectWithValue(error.response.data.message || 'Tickets Fetch failed')
                } else if (error.request) {
                    console.error('Error request:', error.request)
                    return thunkAPI.rejectWithValue('No response received from the server')
                } else {
                    console.error('Error message:', error.message)
                    return thunkAPI.rejectWithValue('An unexpected error occurred')
                }
            })
    })