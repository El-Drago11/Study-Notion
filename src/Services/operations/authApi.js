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
            console.log(" Before hitiing login : ",settingsEndpoints.LOGIN_API,{email,password})
            const response = await apiConnector("POST",settingsEndpoints.LOGIN_API,{email,password})
            if(response){
            toast.success(`Welcome back ${email}`);
            dispatch(setUser(response.data.user))
            dispatch(setToken(response.data.user.token))
            localStorage.setItem("token",JSON.stringify(response.data.user.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            navigate('/')
            }
        } catch (error) {
            console.error("Login API Error:", error.response ? error.response.data : error.message);
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
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success(`OTP send to mail - ${email}`);
            navigate('/verify-email')
        } catch (error) {
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
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent");
            setEmailSent(true)
        }catch(error){
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
            if(!response.data.success){
                console.log("HELLO : ",response)
                throw new Error(response.data.message)
            }
            toast.success("password reset Successfully")
            setEmailSent(true);
        } catch (error) {
            toast.error("Unable to reset password")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export function userLogout(dispatch,navigate){
    return () =>{
    dispatch(setToken(null));
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
    }
  }