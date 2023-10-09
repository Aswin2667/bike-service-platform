import axios from "axios";
class BookingService {

    addBooking(booking){
        return axios.post(`${import.meta.env.VITE_USER_API_BASE_URL}/booking/add`,booking)
    }
    getBookingByids(bookingIds){
        const queryString = bookingIds.join("&bookingIds=");
        return axios.get(`${import.meta.env.VITE_USER_API_BASE_URL}/booking/getbookingsbyids?bookingIds=${queryString}`);    
    }    
    getAllBookings(){
        return axios.get(`${import.meta.env.VITE_USER_API_BASE_URL}/booking/getall`);
    }
    updateBookingStatus(bookingId,status){
       return axios.put(`${import.meta.env.VITE_USER_API_BASE_URL}/booking/${bookingId}/status`,{status:status})
    }
    getBookingByUserId(userId){
        return axios.get(`${import.meta.env.VITE_USER_API_BASE_URL}/booking/getBookingByUserId?userId=${userId}`)
    }
    deleteBookingByIds(bookingIds){
        const queryString = bookingIds.join("&bookingIds=");
        return axios.delete(`${import.meta.env.VITE_USER_API_BASE_URL}/booking/remove?bookingIds=${queryString}`)
    }
    
}
export default new BookingService();     