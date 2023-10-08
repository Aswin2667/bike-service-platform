import axios from "axios";
class ChatService {
  getAllMessages(){
    return axios.get(`${import.meta.env.VITE_USER_API_BASE_URL}/chat/all`)
  }
  addMessage(message){
    return axios.post(`${import.meta.env.VITE_USER_API_BASE_URL}/chat/add`,message);
  }
  getMessages()
}
export default new ChatService();
