import axios from "axios";
class BookingService {

    addBooking(booking){
        return axios.post(`${import.meta.env.VITE_USER_API_BASE_URL}/booking/add`,booking)
    }

}
export default new BookingService();