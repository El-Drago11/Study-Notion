const admin = require('firebase-admin');
const User = require('../models/User');

exports.firebasePushNotification = async (senderId,senderName,recieverId,message) => {
    try {
        const userdetail = await User.findById(recieverId)
        const messageBody = {
            notification: {
                title: `Sent By : ${senderName}`,
                body: message,
            },
            token: userdetail.deviceToken,
        };

        // Send the notification
        const response = await admin.messaging().send(messageBody);

    } catch (error) {
        console.error('Error sending notification:', error);
        return false
    }
};
