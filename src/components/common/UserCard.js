import { RiMessage2Line } from "react-icons/ri"

const UserCard = ({profileImage,firstName,lastName,email,accountType,onClickFunction}) => {
    return (
        <div className="flex flex-row items-center gap-5 bg-richblack-500 p-2 rounded-lg">
            <img src={profileImage} className=" h-28 rounded-md" />
            <div className="flex flex-col gap-1 items-start">
                <div className="capitalize">Name : {firstName + ' ' + lastName}</div>
                <div>Contact : {email}</div>
                <div>Position : <span className=" text-yellow-50">{accountType}</span></div>
                <div className="flex gap-3 items-center cursor-pointer" onClick={() => onClickFunction()}>Message : <RiMessage2Line color="yellow" /></div>
            </div>
        </div>
    )
}

export default UserCard