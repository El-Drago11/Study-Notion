import { useEffect, useState } from "react";
import { getAdminProfileDetail, getAllRegisterTeacher, getAllRegistredStudent } from "../Services/operations/adminApi";
import { FiMessageSquare } from "react-icons/fi";
import { RiMessage2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserCard from "../components/common/UserCard";
import { getEnrolledCourses } from "../Services/operations/profileApi";

const SupportDesk = () => {

    const navigate = useNavigate();
    const [getSupportDesk, setSupportDesk] = useState([]);
    const [getRegisteredTeacher, setRegisteredTeacher] = useState([]);
    const { user } = useSelector((store) => store.profile);

    const fetchSupportDesk = async () => {
        if (user?.accountType != 'Admin') {
            const resp = await getAdminProfileDetail();
            setSupportDesk(resp);
        }
        if (user?.accountType == 'Admin') {
            const resp = await getAllRegistredStudent();
            setSupportDesk(resp);
            const InstructorList = await getAllRegisterTeacher();
            setRegisteredTeacher(InstructorList)
        }
        if(user?.accountType=='Student'){
            const resp = await getEnrolledCourses();
            setRegisteredTeacher(resp)
        }
        return;
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
                <UserCard profileImage={getSupportDesk?.image} firstName={getSupportDesk?.firstName} lastName={getSupportDesk?.lastName} email={getSupportDesk?.email} accountType={getSupportDesk?.accountType} onClickFunction={() => goToChat(getSupportDesk?._id)} />
            }
            {
                user?.accountType == 'Admin' &&
                <>
                    <div className=" flex flex-col mt-10 gap-4">
                        <div className="text-2xl w-full font-bold underline text-yellow-50">Students Enrolled</div>
                        {
                            getSupportDesk?.map((item) => (
                                <UserCard profileImage={item?.image} firstName={item?.firstName} lastName={item?.lastName} email={item?.email} accountType={item?.accountType} onClickFunction={() => goToChat(item?._id)} />
                            ))
                        }
                        <div className="text-2xl w-full font-bold underline mt-10 text-yellow-50">Registered Teacher</div>
                        {
                            getRegisteredTeacher?.map((item) => (
                                <UserCard profileImage={item?.image} firstName={item?.firstName} lastName={item?.lastName} email={item?.email} accountType={item?.accountType} onClickFunction={() => goToChat(item?._id)} />
                            ))
                        }
                    </div>
                </>
            }
            {
                user?.accountType == 'Student' &&
                <>
                    <div className=" flex flex-col mt-10 gap-4">
                        <div className="text-2xl w-full font-bold underline mt-10 text-yellow-50">Your Instructor</div>
                        {
                            getRegisteredTeacher?.map((item) => (
                                <UserCard profileImage={item?.image} firstName={item?.firstName} lastName={item?.lastName} email={item?.email} accountType={item?.accountType} onClickFunction={() => goToChat(item?._id)} />
                            ))
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default SupportDesk;