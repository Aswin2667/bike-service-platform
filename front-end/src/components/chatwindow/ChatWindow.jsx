import React, { useState,useEffect,useRef } from "react";
import UserService from "../../services/userservice/UserService";
import ChatService from "../../services/chatservice/ChatService";

const ChatWindow = () => {

  
  // Dummy data for messages
  const [initialMessages,setinitialMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  
  // Filter messages for Bob and admin
  const [contacts, setContacts] = useState([]); // Initialize with an empty array
const fetchMessagesAndUsers = ()=>{
  UserService.getAllUser().then((response) => {
    setContacts(response.data);
  })
  .catch((error) => {
    console.error("Error fetching contacts:", error);
  });
  ChatService.getAllMessages().then((res)=>{
    setinitialMessages(res.data);
  }).catch((err)=>{
    console.log(err);
  })
}
  // Use useEffect to fetch contacts when the component mounts
  useEffect(() => {
    // Make an HTTP GET request to fetch contacts from your server
    
      const intervalId = setInterval(fetchMessagesAndUsers, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // State to track selected contact and its messages
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);

  // Function to handle contact selection
  const handleContactClick = (contactIndex) => {
    setSelectedContact(contacts[contactIndex]);
    const selectedName = contacts[contactIndex].username;
    const filteredMessages = initialMessages.filter(
      (message) =>
        (message.sender === "root" && message.receiver === selectedName) ||
        (message.sender === selectedName && message.receiver === "root")
    );
    setMessages(filteredMessages);
  };
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") {
      return; // Do not send empty messages
    }

    try {
      // Send the message to the server and save it in the database
      const response = await ChatService.addMessage({
        text: inputMessage,
        sender: "root", // Set the sender as "root"
        receiver: selectedContact.username, // Use the selected contact as the receiver
      }).then((res)=>{
        setMessages([...messages, res.data]);
        // Clear the input field
        setInputMessage("");
      })
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  // Create a ref for the chat messages container
  const messagesContainerRef = useRef(null);

  // Use useEffect to scroll to the bottom of the chat messages container when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="flex h-screen -between bg-gray-900">
      {/* Contacts List */}
      <div className="w-1/4 overflow-y-auto flex flex-col p-5 border border-purple-400">
        <div className="flex flex-col h-screen">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className={`mb-4 rounded p-2 hover:bg-purple-400 duration-500 cursor-pointer ${
                selectedContact && selectedContact.username === contact.username
                  ? "bg-purple-400"
                  : "bg-purple-900"
              }`}
              onClick={() => handleContactClick(index)}
            >
              <div className="flex items-center space-x-2">
                <div className="w-16 h-16 rounded-full text-white flex items-center justify-center">
                  <img className="" src={`data:image/svg+xml;base64,${contact.avatarimage}`} alt={contact.name} />
                </div>
                <h1 className="text-3xl text-white">{contact.username}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full p-4 flex items-center h-24 bg-gray-800 rounded-lg gap-5">
          <img className="h-16" src="src/assets/images/3.svg" />
          <h1 className="text-3xl text-white w-full text-center">ADMIN</h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        {selectedContact && (
          <>
            <div className="bg-gray-800 flex items-center gap-5 text-white p-4">
              <img
                className="h-14"
                src={`data:image/svg+xml;base64,${selectedContact.avatarimage}`}
                alt={selectedContact.username}
              />
              <h1 className="text-2xl font-semibold">{selectedContact.username}</h1>
            </div>
            <div className="flex-grow p-4 overflow-y-auto" ref={messagesContainerRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "root" ? "justify-end" : ""
                  } mb-4`}
                >
                  {message.sender !== "root" && (
                    <img
                      className="h-7 m-4"
                      src={selectedContact ? selectedContact.avatar : ""}
                      alt={selectedContact ? selectedContact.name : ""}
                    />
                  )}
                  <div className="">
                    <div
                      className={`p-3 rounded-lg max-w-xs ${
                        message.sender === "root"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-800"
                      }`}
                    >
                      {message.text}
                    </div>
                    <small className="text-white">
                    {new Date(message.timestamp).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}
                    </small>
                  </div>
                  {message.sender === "root" && (
                    <img
                      className="h-7 m-4"
                      src={selectedContact ? selectedContact.avatar : ""}
                      alt={selectedContact ? selectedContact.name : ""}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="bg-transparent p-4 ">
              <div className="flex">
                <input
                  type="text"
                  className=" flex-grow border border-purple-400 text-white text-xl focus:outline-none rounded-l-md border-r-0 p-2 bg-transparent"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={handleSendMessage} className="bg-transparent border border-purple-400 text-white rounded-r-md pl-5 pr-5 border-l-0">
                  <div className="flex items-center h-full w-full text-white">
                    <ion-icon name="send"></ion-icon>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
        {!selectedContact && (
          <>
            <div className="h-full w-full flex items-center justify-center">
              <img className="h-1/2 w-1/2" src="src/assets/videos/robot.gif" alt="" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
