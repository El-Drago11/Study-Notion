const socket = require("socket.io")
const UserChat = require("../models/UserChat");
const { auth, verifySocket } = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const { firebasePushNotification } = require("./firebaseNotification");

//-->function to store the Chat to Db

const SaveMessageToDB = async(senderId,recieverId,message)=>{
    try {
        const resp = await UserChat.create({senderId,recieverId,message})
        return resp;
    } catch (error) {
        throw new Error(error)
    }
    return;
}

const initializeTheSocket = (server) => {
    //step-3: cors setup
    const io = socket(server, {
        cors: {
            origin: 'http://localhost:3000',
        }
    })
    //step-4: when the web trying to connect with the backend
    io.on("connection", async(socket) => {

        //---> Verify token
        const token = socket.handshake.auth.token
        const isVerify = await verifySocket(token)
        if(!isVerify) return;
        
        //-----> handle events
        socket.on("join-chat",({senderId,senderName,recieverId,recieverName})=>{
            //create a uniqueId
            const roomId = [senderId,recieverId].sort().join('_').trim();
            socket.join(roomId)
        });

        socket.on("send-message",async({senderId,recieverId,message})=>{
            //step1: Get the roomId
            const roomId = [senderId,recieverId].sort().join('_').trim();
            //Step2: Send the message to the reciever 
            io.to(roomId).emit("recieve-message",{senderId,recieverId,message})
            //Step3:  Save the Message to the Database
            await SaveMessageToDB(senderId,recieverId,message)
            //step4: Send notification using firebase
            await firebasePushNotification(recieverId)
        })

        socket.on("disconnect",()=>{})
    });
}

module.exports = initializeTheSocket;