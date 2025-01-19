import { useParams } from "react-router-dom";
import { getUserDetailById } from "../../../Services/operations/profileApi";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NotificationsActiveOutlined } from "@mui/icons-material";
import { createSocketConnection } from "../../../utils/socket";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Message = () => {
    const params = useParams();
    const messageRef = useRef();
    const socket = createSocketConnection();
    const [getAllMessage,setAllMessage] = useState([]);

    const { user } = useSelector((store) => store.profile)

    const [getRecieverData, setRecieverData] = useState();

    const getrecieverDetail = async () => {
        const resp = await getUserDetailById(params.userId)
        setRecieverData(resp);
    }

    const sendMessage = () => {
        const messageData = messageRef?.current?.value?.trim();
        console.log('Message data : ', messageData);
        if(!messageData.length) return;
        socket.emit('send-message',
            {
                senderId: user?._id, 
                recieverId: params.userId, 
                message: messageData
            }
        )
        messageRef.current.value = '';
    }

    socket.on("recieve-message",({senderId,recieverId,message})=>{
        // if(recieverId==user?._id && senderId == getRecieverData?.id){
            setAllMessage((prev)=>[...prev,{senderId,recieverId,message}])
        // }
    })

    useEffect(() => {
        getrecieverDetail();
    }, [params.userId])

    useEffect(() => {
        if(!user || !getRecieverData) return;
        //-->Connect to socket when component loads
        socket.emit("join-chat",
            {
                senderId: user?._id, 
                senderName: user?.firstName,
                recieverId: params.userId, 
                recieverName: getRecieverData?.firstName
            }
        )

        //-->when component unmount disconnect the socket
        return () => {
            socket.disconnect();
        }
    }, [params.userId,getRecieverData])

    return (
        <div className="text-white bg-richblack-500 w-full flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-1 border-b-2 border-yellow-50 h-[10%]">
                <div className="flex gap-2 items-center">
                    <img src={getRecieverData?.image} className="h-14 w-14 rounded-full" />
                    <div>{getRecieverData?.firstName + ' ' + getRecieverData?.lastName}</div>
                </div>
                <div>
                    <NotificationsActiveOutlined className="text-3xl" />
                </div>
            </div>
            {/* Get message */}
            <div className="h-[80%] bg-white overflow-y-auto relative flex flex-col gap-7 py-5 px-5">
                {
                    getAllMessage?.map((item)=>(
                        <div className={`bg-richblack-800 text-white font-bold flex gap-2 min-w-fit rounded-md ${item?.senderId==user?._id ? ' place-self-start':' place-self-end'} px-4 py-2`}>
                            <div className="flex flex-row gap-2 items-center">
                            <img src={item?.senderId==user?._id ? user?.image :getRecieverData?.image} className="h-10 w-10 rounded-full"/>
                            </div> 
                            <div className="text-white flex flex-row gap-2 items-center">
                                <div>{item?.message}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* Send message */}
            <div className="flex justify-between h-[10%] py-2 px-2">
                <div className="h-full w-[80%]">
                    <input placeholder="Enter your message" className="rounded-md h-full w-full px-4 text-black font-bold" ref={messageRef} />
                </div>
                <div className="h-full w-[10%] ">
                    <button className="h-full w-full px-2 bg-yellow-50 rounded-2xl" onClick={() => sendMessage()}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Message;