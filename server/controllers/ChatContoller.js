const UserChat = require("../models/UserChat");

exports.getUserChatById = async (req, res) => {
    try {
        const { userId, recieverId } = req.query;
        const response = await UserChat.find({
            $or: [
                { senderId: userId, recieverId: recieverId },
                { senderId: recieverId, recieverId: userId }
            ]
        }).sort({ createdAt: 1 });
        return res.status(200).json({
            success: true,
            data: response,
            message: 'All Message fetched successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}