import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"

export function updateProfilePic(formData,token){
    return async()=>{
        const toatID = toast.loading("Uploading your Image")
        try {
            const response = await apiConnector("PUT",profileEndpoints.UPDATEDISPLAYPICTURE_API,formData,
                {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                });
            console.log(response)
            if(!response.data.success){
                throw new Error("Error : ", response.data);
            }
            toast.success("Profile pic uploaded successfully");
        } catch (error) {
            console.log(error);
            toast.error("Uable to upload Profile Image")
        }
        toast.dismiss(toatID);
    }
} 

export function getEnrolledCourses(token){
    return async()=>{
        const toastId = toast.loading("Fetching Enrolled Courses");
        try {
            const response = await apiConnector("GET",profileEndpoints.GET_ENROLLED_COURSES_API,null,{Authorization: `Bearer ${token}`})
            // console.log(response)
            
        } catch (error) {
            console.log(error);
            toast.error("Unable to fetch Enrolled Courses")
        }
        toast.dismiss(toastId)
    }
}