const express = require('express');
const { getAdminDetails } = require('../controllers/Admin');
const router = express.Router();
const { auth } = require("../middlewares/auth")


router.get('/adminDetail',auth,getAdminDetails)

module.exports = router