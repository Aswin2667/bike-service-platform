import React,{ useState } from "react";
import Navbar from "../../layout/navbar/Navbar";
import "./profile.css"
import { useSelector } from "react-redux";
import { message } from "antd";
const Profile = () => {
  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(textToCopy);
    message.success("ID copied to clipboard");
  };
  const User = useSelector((state)=>state.user.user);
  const [textToCopy, setTextToCopy] = useState(User._id);
  const Logout = ()=>{

  }
  return (
    <div className="flex flex-row gap-5 w-screen">
      <Navbar />
      <div className="w-screen flex justify-center">
        <div className="flex flex-row justify-center items-center h-screen w-max">
          <div className=" gradient-border bg-gray-900  rounded-lg shadow-md p-16  text-white text-center relative w-96 max-w-full mx-auto">

            <img
              className="rounded-full border-2  border-cyan-500 w-24 h-24 mx-auto"
              src={User.isAvatarImageSet ? `data:image/svg+xml;base64,${User.avatarimage}` : '/src/assets/images/defaultProfile.svg'}
              alt="user"
            />
            <h3 className="mt-2 text-xl font-semibold">{User.username}</h3>
            <h6 className="mt-1 text-2xl text-gray-400">{User.email}</h6>
            <p className="text-sm mt-2">
              CLEINT ID:
            </p>
            <h3 onClick={handleCopyClick} title="Click to copy ID " className="text-xl font-serif hover:cursor-pointer">{User._id}</h3>
            <div className="flex justify-center items-center bg-purple-800 text-left mt-6 hover:bg-purple-600 duration-500 rounded">
              <button onClick={Logout()} className="cursor-pointer atext-2xl uppercase text-gray-400 p-4 h-full w-full text-center">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
