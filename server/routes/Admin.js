const express = require('express');
const { getAdminDetails, getAllRegisterUserDetail, getAllRegisterTeacherDetail } = require('../controllers/Admin');
const router = express.Router();
const { auth } = require("../middlewares/auth");


router.get('/adminDetail',auth,getAdminDetails)
router.get("/getRegistredStudents",auth,getAllRegisterUserDetail)
router.get('/getRegisterInstructor',auth,getAllRegisterTeacherDetail)


module.exports = router