const socket = require("socket.io")

const initializeTheSocket = (server) => {
    //step-3: cors setup
    const io = socket(server, {
        cors: {
            origin: 'http://localhost:3000',
        }
    })
    //step-4: when the web trying to connect with the backend
    io.on("connection", (socket) => {
        //-----> handle events
        socket.on("join-chat",({senderId,senderName,recieverId,recieverName})=>{
            //create a uniqueId
            const roomId = [senderId,recieverId].sort().join('_').trim();
            console.log("Roomid : ",roomId)
            socket.join(roomId)
        });
        socket.on("send-message",({senderId,recieverId,message})=>{
            const roomId = [senderId,recieverId].sort().join('_').trim();
            console.log("Message : ",message)
            console.log("Roomid : ",roomId)
            io.to(roomId).emit("recieve-message",{senderId,recieverId,message})
        })

        socket.on("disconnect",()=>{
            console.log("User successfully disconnected")
        })
    });
}

module.exports = initializeTheSocket;