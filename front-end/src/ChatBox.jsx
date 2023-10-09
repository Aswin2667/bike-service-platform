import React, { useState, useEffect ,useRef} from "react";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import ChatService from "./services/chatservice/ChatService";

const ChatBox = ({ isOpen, toggleChat }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null)
  // Access the current user's data from the Redux store
  const currentUser = useSelector((state) => state.user.user);

  const handleMessageSend = async () => {
    if (inputMessage.trim() === "") {
      return; // Do not send empty messages
    }

    try {
      // Send the message to the server and save it in the database
      const response = await ChatService.addMessage({
        text: inputMessage,
        sender: currentUser.username, // Use the current user's username
        receiver: "root", // You can specify the receiver here
      }).then((res)=>{
        setMessages([...messages, res.data]);
        setInputMessage("");
      }).catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch messages for the current user and "root"
        const response = await ChatService.getMessages(
           currentUser.username,
           "root",
        );
        // Update the messages state with the fetched messages
                setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Call the fetchMessages function when the component mounts
    fetchMessages();
  }, [currentUser.username]);

  return (
    <div className="fixed bottom-10 flex flex-col justify-between right-4 w-80 h-1/2 border border-purple-900 rounded-lg shadow-lg">
      <div className="bg-gray-900 border border-purple-900 p-4 h-max flex justify-between items-center rounded-t-lg">
        <h2 className="text-xl text-white font-semibold">Chat</h2>
        <button onClick={toggleChat} className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="h-full overflow-hidden pb-">
      <div className="p-4 h-full overflow-y-auto bg-gray-800" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender !== "root" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block px-3 py-1 rounded-lg ${
                message.sender === currentUser.username
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
      </div>
      <div className="p-4 flex items-center bg-gray-900">
        <input
          type="text"
          placeholder="Type your message"
          className="flex-grow p-2 focus:outline-none text-white rounded-l-lg bg-gray-800"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <div
          className="bg-blue-500 text-white flex items-center rounded-r-lg p-3 cursor-pointer"
          onClick={handleMessageSend}
        >
          <ion-icon
            name="send"
            className="text-xl ml-2 hover:text-blue-700"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
