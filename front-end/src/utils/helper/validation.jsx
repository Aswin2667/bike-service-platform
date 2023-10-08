import { message } from "antd";

export const validateForm = (user) => {
    const {username, password,confirmPassword,email,phonenumber} = user;
    if(phonenumber.length!=10){
      message.error("Enter a valid Mobile Number");
      return false;
    }
    if(password.length<=6){
      message.error("Password length must greater than or equal to 6");
      return false;
    }
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