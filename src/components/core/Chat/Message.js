import { useParams } from "react-router-dom";
import { getUserDetailById } from "../../../Services/operations/profileApi";
import { useEffect, useState } from "react";
import { NotificationsActiveOutlined } from "@mui/icons-material";
import { createSocketConnection } from "../../../utils/socket";
import { useSelector } from "react-redux";

const Message = () => {
    const params = useParams();

    const {user}=useSelector((store)=>store.profile)

    const [getRecieverData, setRecieverData] = useState();

    const getrecieverDetail = async () => {
        const resp = await getUserDetailById(params.userId)
        setRecieverData(resp);
    }

    useEffect(() => {
        getrecieverDetail();
    }, [params.userId])

    useEffect(()=>{
        //-->Connect to socket when component loads
        const socket = createSocketConnection();
        socket.emit("join-chat",{senderId:user?._id,recieverId:params.userId})

        //-->when component unmount disconnect the socket
        return ()=>{
            socket.disconnect();
        }
    },[params.userId])

    return (
        <div className="text-white bg-richblack-500 w-full flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-1 border-b-2 border-yellow-50 h-[10%]">
                <div className="flex gap-2 items-center">
                    <img src={getRecieverData?.image} className="h-14 w-14 rounded-full" />
                    <div>{getRecieverData?.firstName + ' ' + getRecieverData?.lastName}</div>
                </div>
                <div>
                    <NotificationsActiveOutlined className="text-3xl"/>
                </div>
            </div>
            {/* Get message */}
            <div className="h-[80%] bg-white">

            </div>
            {/* Send message */}
            <div className="flex justify-between h-[10%] py-2 px-2">
                <div className="h-full w-[80%]">
                    <input placeholder="Enter your message" className="rounded-md h-full w-full h-full px-4 text-black font-bold"/>
                </div>
                <div className="h-full w-[10%] ">
                    <button className="h-full w-full px-2 bg-yellow-50 rounded-2xl">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Message;