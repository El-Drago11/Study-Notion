import toast from "react-hot-toast"
import { setLoading, setToken} from "../../Store/authReducer"
import { setLoginLoading, setUser } from "../../Store/profileReducer"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis"

export function login (email,password,navigate){
    return async(dispatch)=>{
        dispatch(setLoginLoading(true));
        const toastId = toast.loading("Loging You in..");
        try {
            const response = await apiConnector("POST",settingsEndpoints.LOGIN_API,{email,password})
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success(`Welcome back ${email}`);
            dispatch(setUser(response.data.user))
            console.log(response.data.user)
            dispatch(setToken(response.data.user.token))
            localStorage.setItem("token",JSON.stringify(response.data.user.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            navigate('/')
        } catch (error) {
            console.log("Error while login : ",error);
            toast.error("Unable to login");
        }
        toast.dismiss(toastId);
        dispatch(setLoginLoading(false));
    }
}

export function signUp(firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("Signing You up Please wait...")
        try {
            const response = await apiConnector("POST",settingsEndpoints.SIGNUP_API,{firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp})
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Congratulation!! on sucessfull Signup..")
            navigate('/login')
        } catch (error) {
            console.log("Error while signUp : ",error);
            toast.error("Unable to signUp..")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading('Sending OTP..');
        dispatch(setLoading(true));
        try {
            const response =  await apiConnector("POST",settingsEndpoints.SENDOTP_API,{email,checkUserPresent:true});
            console.log("OTP response : ",response);
            if(!response.data.success){
                console.log("new EROORRRR.. : ")
                throw new Error(response.data.message);
            }
            toast.success(`OTP send to mail - ${email}`);
            navigate('/verify-email')
        } catch (error) {
            console.log("Error while sending OTP : ",error);
            toast.error("Unable to send OTP")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function getPasswordResetToken(email,setEmailSent){
    const toastId = toast.loading("Loading...")
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",settingsEndpoints?.RESETPASSWORDTOKEN_API,{email})
            console.log("Reset Password Token response....",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent");
            setEmailSent(true)
        }catch(error){
            console.log("Reset password Token error",error)
            toast.error("Error: While sending reset password token")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function resetPassword (password,confirmPassword,token,setEmailSent){
    const toastId =  toast.loading("Reseting Password...")
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",settingsEndpoints.RESETPASSWORD_API,{password,confirmPassword,token})
            console.log("Reset Password response : ",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("password reset Successfully")
            setEmailSent(true);
        } catch (error) {
            console.log("Error in Reseting the password : ",error);
            toast.error("Unable to reset password")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export function userLogout(dispatch,navigate){
    dispatch(setToken(null));
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }