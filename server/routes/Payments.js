// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment ,sendPaymentSuccessEmail } = require("../controllers/Payments")
const { auth,isStudent} = require("../middlewares/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail)

module.exports = router