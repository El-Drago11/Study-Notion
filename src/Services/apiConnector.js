import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method,url,bodyData=null,headers=null,params=null)=>{
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = '/login';
        return;
    }
    return axiosInstance({
        method :`${method}`,
        url:`${url}`,
        data:bodyData ? bodyData : null,
        headers:{Authorization: `Bearer ${JSON.parse(token)}`},
        params : params ? params : null
    })
}