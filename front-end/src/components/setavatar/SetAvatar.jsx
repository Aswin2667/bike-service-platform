import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import loader from "../../assets/videos/loader.gif";
import UserService from "../../services/userservice/UserService";
import AvatarService from "../../services/avatarservice/AvatarService"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
export default function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const navigate = useNavigate();
  const User = useSelector((state)=>state.user.user);
    const setProfilePicture = ()=>{
      if(selectedAvatar === undefined){
        message.error("Please select an avatar");
        return;
      }
      const data = UserService.setAvatar(User._id,{
        avatarimage:avatars[selectedAvatar]
      }).then((res)=>{
        if(res.data.status){
          message.success(res.data.msg+". You can login now");
          navigate("/");
        }else{
          message.error("Error occured while setup :(");
        }
      });
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = [];
          for (let i = 0; i < 3; i++) {
            const image = await AvatarService.randomAvatar();
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
          }
          setAvatars(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData(); 
    
    }, []);
    
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center  gap-3 bg-gray-900 h-screen w-screen ">
          <div><img src={loader} alt="loader" className="max-w-full" /></div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
        <div className="flex justify-center items-center flex-col gap-3 bg-grey-900 h-screen w-max">
          <div className="title-container">
            <h1 className="text-white text-xl">Pick an Avatar as your profile picture</h1>
          </div>
          <div className=" flex gap-8 w-max">
            {avatars.map((avatar, index)=>{
              return (
                <div
                className={`${selectedAvatar === index ? "border-8 border-violet-700 rounded-full transition duration-500 ease-in-out transform hover:scale-110" : "border-violet-700"}`}
                onClick={() => setSelectedAvatar(index)}
                key={avatar}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  
                  className=" h-28  border-4 border-transparent  rounded-full transition duration-500 ease-in-out transform hover:scale-110  cursor-pointer"
                />
                
              </div>
              )
            })
            }
          </div>
          <button
            className="submit-btn bg-purple-600 text-white px-8 py-4 font-bold rounded-full uppercase hover:bg-purple-700"
            onClick={setProfilePicture}
          >
            Set as Profile Picture
          </button>
        </div>
        </div>
      )}
    </>
  );
}
