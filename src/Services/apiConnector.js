import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData = null, headers = {}, params = null) => {
    const token = localStorage.getItem("token");
    const authHeaders = token ? { Authorization: `Bearer ${JSON.parse(token)}` } : {};
    try {
        console.log("API Request:", { method, url, bodyData, headers, params });
        const response = await axiosInstance({
            method,
            url,
            data: bodyData || null,
            headers: { ...authHeaders, ...headers },
            params: params || null,
        });
        console.log("API Response:", response);
        return response;
    } catch (error) {
        console.error("API Error:", error.response || error.message);
        throw error; // Re-throw for caller handling
    }
};
