import { logoutUser } from "@/redux/middleware/auth";
import { store } from "@/redux/store";
import axiosInstance from "@/utils/axiosInstance";
import { secureStore } from "@/utils/secure-store";

interface RegisterClientParams {
    password: string;
    firstName: string;
    lastName: string;
    contact: string;
}

const registerClient = async (registerClientParams: RegisterClientParams) => {
    const response = await axiosInstance.post("/auth/register-client", registerClientParams).then((res) => {
        return res;
    }).catch((error) => {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw new Error(error.response.data.message || "An error occurred during registration.");
        } else if (error.request) {
            console.error("Error request:", error.request);
            throw new Error("No response received from the server.");
        } else {
            console.error("Error message:", error.message);
            throw new Error("An unexpected error occurred.");
        }
    });
};

const refreshAccessToken = async () => {
    try {
        const refreshToken = await secureStore.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axiosInstance.post('/auth/refresh', {
            refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        await secureStore.setAccessToken(accessToken);
        await secureStore.setRefreshToken(newRefreshToken);
        return accessToken;
    } catch (error: any) {
        console.error('Token refresh failed', error);
        await store.dispatch(logoutUser());
        throw new Error('Session expired. Please log in again.');
    }
};

export default { registerClient, refreshAccessToken };