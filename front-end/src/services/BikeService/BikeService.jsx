import axios from "axios";
class BikeService {

    getAllService(){
        return axios.get(`${import.meta.env.VITE_USER_API_BASE_URL}/service/all`);
    }

}
export default new BikeService();