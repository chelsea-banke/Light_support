const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const setAccessToken = (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
};

const removeRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const clearAllTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const localStore = {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    removeAccessToken,
    removeRefreshToken,
    clearAllTokens
};