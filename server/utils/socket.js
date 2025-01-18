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
        socket.on("join-chat",({senderId,recieverId})=>{
            //create a uniqueId
            const roomId = [senderId,recieverId].join('_');
            socket.join(roomId)
            console.log("Joining room : ",roomId)
        });
        socket.on("send-message",()=>{

        })

        socket.on("disconnect",()=>{

        })
    });
}

module.exports = initializeTheSocket;