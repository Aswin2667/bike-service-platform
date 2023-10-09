import axios from "axios";
class BikeService {

    getAllService(){
        return axios.get(`${import.meta.env.VITE_USER_API_BASE_URL}/service/all`);
    }
    updateService(id,Service){
        return axios.put(`${import.meta.env.VITE_USER_API_BASE_URL}/service/update/${id}`,Service)
    }
    deleteServiceById(id){
        return axios.delete(`${import.meta.env.VITE_USER_API_BASE_URL}/service/delete/${id}`)
    }

}
export default new BikeService();