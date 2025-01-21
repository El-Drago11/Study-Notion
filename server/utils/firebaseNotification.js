const admin = require('firebase-admin');
const User = require('../models/User');

exports.firebasePushNotification = async (userId) => {
    try {
        const userdetail = await User.findById(userId)
        const messageBody = {
            notification: {
                title: 'Hello test',
                body: 'This is the description',
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
