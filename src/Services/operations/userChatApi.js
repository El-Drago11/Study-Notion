import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { chatEndPoints } from "../apis";

export async function getUserChatById (userId,recieverId){
    const toastId = toast.loading('Fetching userId');
    let resp;
    try {
        const response = await apiConnector("GET",chatEndPoints.USERCHAT_BYID_API,null,null,{userId,recieverId})
        resp = response;
        toast.success('User chat fetched succesfully');
    } catch (error) {   
        throw new Error(error)
    }
    toast.dismiss(toastId)
    return resp?.data?.data;
}