import axiosInstance from "@/utils/axiosInstance"
import { secureStore } from "@/utils/secure-store"
import { createAsyncThunk } from "@reduxjs/toolkit"

// Logout Thunk
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    return await axiosInstance.post('/auth/logout', {
        "refreshToken": await secureStore.getRefreshToken()
    })
    .then(async () => {
        await secureStore.clearAllTokens()
        return true
    })
    .catch((error) => {
        console.error('Logout error:', error)
        throw new Error('Logout failed')
    })
})