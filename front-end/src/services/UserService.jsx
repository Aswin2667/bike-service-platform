import axios from "axios";
const USER_API_BASE_URL = "http://localhost:9090/user";

class UserService {

    saveUser(User) {
        return axios.post(USER_API_BASE_URL+"/register",User);
    }

    findUser(User){
        return axios.post(USER_API_BASE_URL+"/login",User);
    }

}
export default new UserService();