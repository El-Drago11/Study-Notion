import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData = null, headers = {}, params = null) => {
    const token = localStorage.getItem("token");
    const authHeaders = token ? { Authorization: `Bearer ${JSON.parse(token)}` } : {};
    try {
        const response = await axiosInstance({
            method,
            url,
            data: bodyData || null,
            headers: { ...authHeaders, ...headers },
            params: params || null,
        });
        return response;
    } catch (error) {
        // window.location.href='/'
        // localStorage.clear();
        console.error("API Error:", error.response || error.message);
        throw error;
    }
};
