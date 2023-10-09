import axios from "axios";
class ChatService {
  getAllMessages(){
    return axios.get(`${import.meta.env.VITE_USER_API_BASE_URL}/chat/all`)
  }
  addMessage(message){
    return axios.post(`${import.meta.env.VITE_USER_API_BASE_URL}/chat/add`,message);
  }
  getMessages(sender,receiver){
    return axios.get(`${import.meta.env.VITE_USER_API_BASE_URL}/chat/?sender=${sender}&&receiver=${receiver}`);
  }
}
export default new ChatService();
// http://localhost:9090/chat/?sender=Aswin2667&receiver=Admin