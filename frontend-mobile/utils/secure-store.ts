import * as SecureStore from 'expo-secure-store'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

const setAccessToken = async (accessToken: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken)
}

const setRefreshToken = async (refreshToken: string) => {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken)
}

const getAccessToken = async () => {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
}

const getRefreshToken = async () => {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
}

const removeAccessToken = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
}

const removeRefreshToken = async () => {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
}

const clearAllTokens = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
}

export const secureStore = {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    removeAccessToken,
    removeRefreshToken,
    clearAllTokens
}