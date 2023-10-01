import axios from "axios";
const USER_API_BASE_URL = "http://localhost:9090/user";
class UserService {

    saveUser(User) {
        return axios.post(USER_API_BASE_URL+"/register",User);
    }

    loginUser(User){
        return axios.post(USER_API_BASE_URL+"/login",User);
    }
    authUser(token) {
        const headers = {
            Authorization: `Bearer ${token}`, 
                  };
        
         
          return axios.get(`${USER_API_BASE_URL}/auth`, { headers });
    }

}
export default new UserService();