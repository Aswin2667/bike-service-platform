import { message } from "antd";

export const validateForm = (user) => {
    const {username, password,confirmPassword,email} = user;
    if(password!==confirmPassword){
      message.error("Password doesn't match!");
      return false;
    }
    if(username.length<3){
      message.error("UserName must be greater than or Equal to 3 characters!!");
      return false ;
    }
    if(!/^\S+@\S+\.\S+$/.test(email)){
        message.error("Please Enter a Valid E-mail address!!");
        return false;
    }
    return true;
  };
  export const validateLoginForm = (user)=>{
    if(user.username.length<3){
        message.error("UserName must be greater than or Equal to 3 characters!!");
        return false ;
      }
      return true;
  }