import axiosInstance from "../utils/axiosInstance"

const createTicket = async (data: any) => {
    try {
        const res = await axiosInstance.post("/ticket/create", {
            description: data.description,
            faultId: data.faultId,
            assetId: data.assetId
        });

        return res.data;

    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw new Error(error.response.data.message || "An error occurred while creating the ticket.");
        } else if (error.request) {
            console.error("Error request:", error.request);
            throw new Error("No response received from the server.");
        } else {
            console.error("Error request:", error.request);
            throw new Error("No response received from the server.");
        }
    }
}


const getTicket = async (faultId: any) => {
    try {
        const res = await axiosInstance.get(`/ticket/get?faultId=${faultId}`);
        return res.data;

    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw new Error(error.response.data.message || "An error occurred while getting the ticket.");
        } else if (error.request) {
            console.error("Error request:", error.request);
            throw new Error("No response received from the server.");
        } else {
            console.error("Error request:", error.request);
            throw new Error("No response received from the server.");
        }
    }
}

export default {
    createTicket,
    getTicket
};