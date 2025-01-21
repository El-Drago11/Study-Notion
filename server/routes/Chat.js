const express = require('express');
const { getUserChatById } = require('../controllers/ChatContoller');
const { firebasePushNotification } = require('../utils/firebaseNotification');
const router = express.Router();

router.get('/getUserMessage',getUserChatById);

module.exports = router