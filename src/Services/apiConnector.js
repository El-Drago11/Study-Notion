import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData = null, headers = {}, params = null) => {
    const token = localStorage.getItem("token");
    const authHeaders = token ? { Authorization: `Bearer ${JSON.parse(token)}` } : {};
    const deviceToken = localStorage.getItem('deviceToken')
    try {
        const response = await axiosInstance({
            method,
            url,
            data: bodyData || null,
            headers: { ...authHeaders,deviceToken, ...headers },
            params: params || null,
        });
        return response;
    } catch (error) {
        window.location.href='/'
        localStorage.clear();
        const errorMessage = error.response.data.message || 'Invalid Value! Please Try Again'
        toast.error(errorMessage)
        console.error("API Error:", error.response);
        throw error;
    }
};
