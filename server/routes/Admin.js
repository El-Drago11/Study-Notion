const express = require('express');
const { getAdminDetails } = require('../controllers/Admin');
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { getAllRegisterUserDetail } = require('../controllers/Profile');


router.get('/adminDetail',auth,getAdminDetails)
router.get("/getRegistredStudents",auth,getAllRegisterUserDetail)


module.exports = router