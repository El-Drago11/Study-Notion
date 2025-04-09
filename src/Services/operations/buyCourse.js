import toast from "react-hot-toast";
import { paymentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { resetCart } from "../../Store/cartReducer";
import { setPaymentLoading } from "../../Store/courseReducer";
import rzplogo from '../../assets/Logo/rzp_logo.png'

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} = paymentEndpoints;


// step1: adding the script src of razor payment to our app
function loadScript(src){
  return new Promise ((resolve)=>{
    const script = document.createElement("script");
    script.src = src;
    script.onload = () =>{
        resolve(true);
    }
    script.onerror = () =>{
        resolve(false);
    }
    document.body.appendChild(script);
  })
}

export async function buyCourse( token, courses, user_details, navigate, dispatch){
    
    const toastId = toast.loading("Loading...")
    try {
        // step1:load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.error("RazorPay integration failed!!");
            return;
        }

        //Step2: Initate the order
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,{courses},{Authorization:`Bearer ${token}`})
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }
        // Step3: Option creation
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank you for Purchasing the Course.",
            image: rzplogo,
            prefill: {
                name: `${user_details.firstName} ${user_details.lastName}`,
                email: user_details.email,
            },
            handler: function (response) {
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
                verifyPayment({ ...response, courses,user_details} , token, navigate, dispatch)
            },
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.")
        })
    } 
    catch (error) {
        toast.error(`${error.message || "Something went wrong!"}`)
    }
    toast.dismiss(toastId)
}
// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true))
    try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
        Authorization: `Bearer ${token}`,
      })
    
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
  
      toast.success("Payment Successful. You are Added to the course ")
      navigate("/dashboard/enrolled-courses")
      dispatch(resetCart())
    } catch (error) {
      toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
  }
  
  // Send the Payment Success Email
  async function sendPaymentSuccessEmail(response, amount, token) {
    try {
      await apiConnector(
        "POST",
        SEND_PAYMENT_SUCCESS_EMAIL_API,
        {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          amount,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
    } catch (error) {
      throw new Error(error)
    }
  }
  