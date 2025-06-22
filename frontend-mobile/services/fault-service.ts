import axiosInstance from "@/utils/axiosInstance";

const createFault = async (fault: any): Promise<any> => {
    return axiosInstance.post("/fault/create-fault", fault)
        .then((res) => res.data)
        .catch((error) => {
            if (error.response) {
                console.error("Error response:", error.response.data);
                throw new Error(error.response.data.message || "An error occurred while creating the fault.");
            } else if (error.request) {
                console.error("Error request:", error.request);
                throw new Error("No response received from the server.");
            } else {
                console.error("Error message:", error.message);
                throw new Error("An unexpected error occurred.");
            }
        });
};

export default {
    createFault,
}