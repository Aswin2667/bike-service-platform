import axios from "axios";
const User_API_BASE_URL = "http://localhost:9090/user";

class UserService {

    saveUser(User) {
        return axios.post(User_API_BASE_URL+"/register",User);
    }
}
export default new UserService();