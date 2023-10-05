import axios from "axios"

class AvatarService {
    randomAvatar(){
        return axios.get(`${import.meta.env.VITE_RANDOM_AVATAR_API_URL}/${Math.round(Math.random() * 1000)}`);
    }
    
}

export default new AvatarService();