import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { profileEndpoints, settingsEndpoints } from "../apis"

export function updateProfilePic(formData,token){
    return async()=>{
        const toatID = toast.loading("Uploading your Image")
        try {
            const response = await apiConnector("PUT",profileEndpoints.UPDATEDISPLAYPICTURE_API,formData,
                {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                });
            if(!response.data.success){
                throw new Error("Error : ", response.data);
            }
            toast.success("Profile pic uploaded successfully");
        } catch (error) {
            toast.error("Unable to upload Profile Image")
        }
        toast.dismiss(toatID);
    }
} 

export  async function getEnrolledCourses(){
        const toastId = toast.loading("Fetching Enrolled Courses");
        let result = [];
        try {
            const response = await apiConnector("GET",profileEndpoints.GET_ENROLLED_COURSES_API)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            result = response.data.data
        } catch (error) {
            toast.error("Unable to fetch Enrolled Courses")
        }
        toast.dismiss(toastId)
        return result
}

export async function getUserDetailById(userId) {
    const toastId = toast.loading('Fetching user details');
    let result;
    try {
        const response = await apiConnector('GET',profileEndpoints.GET_USERDETAILS_BY_ID_API,null,null,{userId});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data
    } catch (error) {
        toast.error("Unable to fetch user profile")
    }
    toast.dismiss(toastId)
    return result;
}

export async function getUserInstructor(){
    const toastId = toast.loading('fetching user instructor');
    let result;
    try {
        const response = await apiConnector('GET',profileEndpoints.USER_INSTRUCTOR);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data
    } catch (error) {
        toast.error("Unable to fetch user instructor");
    }
    toast.dismiss(toastId)
    return result;
}

export async function getInstructorStudents() {
    const toastId = toast.loading('Fetching instructor student');
    let result;
    try {
        const response = await apiConnector('GET',profileEndpoints.INSTRUCTOR_ENROLLED_STUDENT);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
    } catch (error) {
        toast.error("Unable to fetch Instructor students");
    }
    toast.dismiss(toastId);
    return result;
}

export async function changeUserPassword(oldPassword,newPassword,confirmPassword){
    const toastId = toast.loading("Chnaging user Passsword....");
    try {
        const response = await apiConnector("POST",settingsEndpoints.CHANGEPASSWORD_API,{oldPassword,newPassword,confirmNewPassword:confirmPassword});
        if(!response.data.success){
            throw new Error(response.data.message);
        }else{
            toast.success("Password changed successfully")
        }
        
    } catch (error) {
        console.log("Error : ",error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return
}