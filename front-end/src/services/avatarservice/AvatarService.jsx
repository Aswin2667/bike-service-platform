import axios from "axios"
const RANDOM_AVATAR_API_URL =`https://api.multiavatar.com/4645646`
const AVATAR_API_BASE_URL = `http://localhost:9090/avatar`
class AvatarService {
    randomAvatar(){
        return axios.get(`${RANDOM_AVATAR_API_URL}/${Math.round(Math.random() * 1000)}`);
    }
    
}

export default new AvatarService();