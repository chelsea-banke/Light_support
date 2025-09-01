import axiosInstance from "../utils/axiosInstance";

const getFault = async (faultId: any): Promise<any> => {
    return axiosInstance.get(`/fault/get?faultId=${faultId}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            if (error.response) {
                console.error("Error response:", error.response.data);
                throw new Error(error.response.data.message || "An error occurred while fetching the fault.");
            } else if (error.request) {
                console.error("Error request:", error.request);
                throw new Error("No response received from the server.");
            } else {
                console.error("Error request:", error.request);
                throw new Error("No response received from the server.");
            }
        });
};

const updateFault = async (updatedData: any): Promise<any> => {
    return axiosInstance.post(`/fault/update-fault`, updatedData)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            if (error.response) {
                console.error("Error response:", error.response.data);
                throw new Error(error.response.data.message || "An error occurred while updating the fault.");
            } else if (error.request) {
                console.error("Error request:", error.request);
                throw new Error("No response received from the server.");
            } else {
                console.error("Error request:", error.request);
                throw new Error("No response received from the server.");
            }
        });
};

export default {
    getFault,
    updateFault
};