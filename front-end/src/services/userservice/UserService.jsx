import axios from "axios";
class UserService {
    
    saveUser(User) {
        return axios.post(import.meta.env.VITE_USER_API_BASE_URL+"/register",User);
    }

    loginUser(User){
        return axios.post(import.meta.env.VITE_USER_API_BASE_URL+"/login",User);
    }
    authUser(token) {
        const headers = {
            Authorization: `Bearer ${token}`, 
                  };
        
         
          return axios.get(`${import.meta.env.VITE_USER_API_BASE_URL}/auth`, { headers });
    }
    setAvatar(ID,avatarimage){
        return axios.post(import.meta.env.VITE_USER_API_BASE_URL+"/setAvatar/"+ID,avatarimage);
    }

}
export default new UserService();