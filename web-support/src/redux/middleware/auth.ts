import axiosInstance from "../../utils/axiosInstance"
import { localStore } from "../../utils//localStore"
import { createAsyncThunk } from "@reduxjs/toolkit"

// Logout Thunk
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    console.log("clearing tokens...");
    return await axiosInstance.post('/auth/logout', {
        "refreshToken": localStore.getRefreshToken()
    })
    .then(() => {        
        localStore.clearAllTokens()
        return true
    })
    .catch((error) => {
        console.error('Logout error:', error)
        throw new Error('Logout failed')
    })
})