import { useEffect, useState } from "react";
import { getAdminProfileDetail, getAllRegistredStudent } from "../Services/operations/adminApi";
import { FiMessageSquare } from "react-icons/fi";
import { RiMessage2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SupportDesk = () => {

    const navigate = useNavigate();
    const [getSupportDesk, setSupportDesk] = useState();
    const { user } = useSelector((store) => store.profile);
    console.log("User : ", user)

    const fetchSupportDesk = async () => {
        if (user?.accountType != 'Admin') {
            const resp = await getAdminProfileDetail();
            setSupportDesk(resp);
        }
        if (user?.accountType == 'Admin') {
            const resp = await getAllRegistredStudent();
            console.log("Register student : ", resp)
            setSupportDesk(resp);
        }
    }

    const goToChat = (userId) => {
        navigate(`/userChat/${userId}`)
    }

    useEffect(() => {
        fetchSupportDesk();
    }, [])

    return (
        <div className="text-white w-full py-4">
            <div className="text-2xl uppercase w-full text-center font-bold">Support desk</div>
            {
                user?.accountType != 'Admin' &&
                <div className="flex flex-row items-center gap-5 bg-richblack-500 p-2 rounded-lg mt-10">
                    <img src={getSupportDesk?.image} className=" h-28 rounded-md" />
                    <div className="flex flex-col gap-1 items-start">
                        <div className="capitalize">Name : {getSupportDesk?.firstName + ' ' + getSupportDesk?.lastName}</div>
                        <div>Contact : {getSupportDesk?.email}</div>
                        <div>Position : <span className=" text-yellow-50">{getSupportDesk?.accountType}</span></div>
                        <div className="flex gap-3 items-center cursor-pointer" onClick={() => goToChat(getSupportDesk?._id)}>Message : <RiMessage2Line color="yellow" /></div>
                    </div>
                </div>
            }
            {
                user?.accountType == 'Admin' &&
                <div className=" flex flex-col mt-10 gap-4">
                    <div className="text-2xl w-full font-bold underline">Students Enrolled</div>
                    {
                        getSupportDesk?.map((item) => (
                            <div className="flex flex-row items-center gap-5 bg-richblack-500 p-2 rounded-lg">
                                <img src={item?.image} className=" h-28 rounded-md" />
                                <div className="flex flex-col gap-1 items-start">
                                    <div className="capitalize">Name : {item?.firstName + ' ' + item?.lastName}</div>
                                    <div>Contact : {item?.email}</div>
                                    <div>Position : <span className=" text-yellow-50">{item?.accountType}</span></div>
                                    <div className="flex gap-3 items-center cursor-pointer" onClick={() => goToChat(item?._id)}>Message : <RiMessage2Line color="yellow" /></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default SupportDesk;