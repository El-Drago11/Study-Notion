import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { adminEndPoints } from "../apis";

export async function getAdminProfileDetail (){
    const toastId = toast.loading("fetching support desk profile...") ;
    let resp ;
    try {
        const response = await apiConnector("GET",adminEndPoints.ADMIN_DETAILS_API)
        resp = response;
    } catch (error) {
        toast.error('Unable to fetch support desk details');
    }
    toast.dismiss(toastId);
    return resp?.data?.data;
}