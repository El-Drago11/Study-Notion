import { useParams } from "react-router-dom";
import { getUserDetailById } from "../../../Services/operations/profileApi";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NotificationsActiveOutlined } from "@mui/icons-material";
import { createSocketConnection } from "../../../utils/socket";
import { useSelector } from "react-redux";
import { getUserChatById } from "../../../Services/operations/userChatApi";
import LoadindScreen from "../../common/LoaderScreen";

const Message = () => {
    const params = useParams();
    const messageRef = useRef();
    const socket = createSocketConnection();
    const [getAllMessage,setAllMessage] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const chatBoxRef = useRef(null);

    const { user } = useSelector((store) => store.profile)

    const [getRecieverData, setRecieverData] = useState();

    const getrecieverDetail = async () => {
        const resp = await getUserDetailById(params.userId)
        setRecieverData(resp);
    }

    const sendMessage = () => {
        const messageData = messageRef?.current?.value?.trim();
        if(!messageData.length) return;
        socket.emit('send-message',
            {
                senderId: user?._id, 
                senderName: user?.firstName,
                recieverId: params.userId,
                recieverName: getRecieverData?.firstName, 
                message: messageData
            }
        )
        messageRef.current.value = '';
    }

    socket.on("recieve-message",({senderId,recieverId,message})=>{
        setAllMessage((prev)=>[...prev,{senderId,recieverId,message}])
    })

    useEffect(() => {
        getrecieverDetail();
    }, [params.userId])

    const fetchUserChat = async(userId,recieverId)=>{
        try {
            const resp = await getUserChatById(userId,recieverId);
            setAllMessage(resp)

        } catch (error) {
            throw new Error(error)   
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
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

        //--> get userChat by id's
        fetchUserChat(user?._id,params.userId);

        //-->when component unmount disconnect the socket
        return () => {
            socket.disconnect();
        }
    }, [params.userId,getRecieverData])

    useEffect(() => {
        const chatBox = chatBoxRef.current;
    
        if (chatBox) {
          const observer = new MutationObserver((mutations) => {
            const hasNewMessages = mutations.some(
              (mutation) =>
                mutation.type === "childList" || mutation.type === "subtree"
            );
    
            if (hasNewMessages) {
              chatBox.scroll({
                top: chatBox.scrollHeight,
                behavior: "smooth",
              });
            }
          });
          observer.observe(chatBox, {
            childList: true,
            subtree: true,
          });
          return () => {
            observer.disconnect();
          };
        }
      }, []);

    return (
        <div className="text-white bg-richblack-500 w-full flex flex-col h-full">
            {isLoading && <LoadindScreen/>}
            <div className="flex items-center justify-between px-4 py-1 border-b-2 border-yellow-50 h-[10%]">
                <div className="flex gap-2 items-center">
                    <img src={getRecieverData?.image} className="h-14 w-14 rounded-full" />
                    <div>{getRecieverData?.firstName + ' ' + getRecieverData?.lastName + ' '+`(${getRecieverData?.accountType})`}</div>
                </div>
                <div>
                    <NotificationsActiveOutlined className="text-3xl" />
                </div>
            </div>
            {/* Get message */}
            <div className="h-[80%] bg-white overflow-y-auto relative flex flex-col gap-7 py-5 px-5" ref={chatBoxRef}>
                {
                    getAllMessage?.map((item)=>(
                        <div className={`bg-richblack-800 text-white font-bold flex gap-2 min-w-fit rounded-md ${item?.senderId==user?._id ? ' place-self-start':' place-self-end'} px-4 py-2`}>
                            <div className="flex flex-row gap-2 items-center">
                            <img src={item?.senderId==user?._id ? user?.image :getRecieverData?.image} className="h-10 w-10 rounded-full"/>
                            </div> 
                            <div className="text-white my-auto max-w-40 lg:max-w-[40rem] text-wrap overflow-hidden text-ellipsis">
                                {item?.message}
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