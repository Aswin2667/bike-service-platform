import React, { useState } from "react";

const ChatWindow = () => {
  // Dummy data for messages
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  // Dummy data for messages
  const initialMessages = [
    {
      text: "Hello, how can I help you?",
      sender: "admin",
      receiver: "Bob",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
    {
      text: "Hi, I have a question.",
      sender: "admin",
      receiver: "Alice",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
    {
      text: "Hello, how can I help you?",
      sender: "Bob",
      receiver: "admin",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
    {
      text: "Hi, I have a question.",
      sender: "Alice",
      receiver: "admin",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
    {
      text: "This is a response from Bob.",
      sender: "Bob",
      receiver: "admin",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
    {
      text: "Another message from Alice.",
      sender: "Alice",
      receiver: "admin",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
    {
      text: "Admin's response to Alice.",
      sender: "admin",
      receiver: "Alice",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
    {
      text: "How can I assist you further?",
      sender: "admin",
      receiver: "Bob",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
    {
      text: "I have more questions to ask.",
      sender: "Bob",
      receiver: "admin",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
    {
      text: "Sure, feel free to ask.",
      sender: "admin",
      receiver: "Bob",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
    {
      text: "What's your favorite color?",
      sender: "Bob",
      receiver: "admin",
      timestamp: randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1)),
    },
  ];
  
  
  // Filter messages for Bob and admin
  const bobAdminMessages = initialMessages.filter(
    (message) =>
      (message.sender === "Bob" && message.receiver === "admin") ||
      (message.sender === "admin" && message.receiver === "Bob")
  );

  // Dummy data for contacts
  const contacts = [
    {
      name: "Alice",
      avatar: "src/assets/images/1.svg",
    },
    {
      name: "Bob",
      avatar: "src/assets/images/2.svg",
    },
  ];

  // State to track selected contact and its messages
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState(bobAdminMessages);

  // Function to handle contact selection
  const handleContactClick = (contactIndex) => {
    setSelectedContact(contacts[contactIndex]);
    // Update messages based on the selected contact (Bob or Alice)
    const selectedName = contacts[contactIndex].name;
    const filteredMessages = initialMessages.filter(
      (message) =>
        (message.sender === "admin" && message.receiver === selectedName) ||
        (message.sender === selectedName && message.receiver === "admin")
    );
    setMessages(filteredMessages);
  };

  return (
    <div className="flex h-screen -between bg-gray-900">
      {/* Contacts List */}
      <div className="w-1/4 overflow-y-auto flex flex-col p-5 border border-purple-400">
        <div className="flex flex-col h-screen">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className={`mb-4 rounded p-2 hover:bg-purple-400 duration-500 cursor-pointer ${
                selectedContact && selectedContact.name === contact.name
                  ? "bg-purple-400"
                  : "bg-purple-900"
              }`}
              onClick={() => handleContactClick(index)}
            >
              <div className="flex items-center space-x-2">
                <div className="w-16 h-16 rounded-full text-white flex items-center justify-center">
                  <img className="" src={contact.avatar} alt={contact.name} />
                </div>
                <h1 className="text-3xl text-white">{contact.name}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full p-4 flex items-center h-24 bg-gray-800 rounded-lg gap-24">
          <img className="h-16" src="src/assets/images/3.svg" />
          <h1 className="text-3xl text-white">ADMIN</h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        {selectedContact && (
          <>
            <div className="bg-gray-800 flex items-center gap-5 text-white p-4">
              <img
                className="h-14"
                src={selectedContact.avatar}
                alt={selectedContact.name}
              />
              <h1 className="text-2xl font-semibold">{selectedContact.name}</h1>
            </div>

            <div className="flex-grow p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "admin" ? "justify-end" : ""
                  } mb-4`}
                >
                  {message.sender !== "admin" && (
                    <img
                      className="h-7 m-4"
                      src={selectedContact ? selectedContact.avatar : ""}
                      alt={selectedContact ? selectedContact.name : ""}
                    />
                  )}
                  <div className="">
                    <div
                      className={`p-3 rounded-lg max-w-xs ${
                        message.sender === "admin"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-800"
                      }`}
                    >
                      {message.text}
                    </div>
                    <small className="text-white">
                      {message.timestamp.toLocaleString()}
                    </small>
                  </div>
                  {message.sender === "admin" && (
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
                />
                <button className="bg-transparent border border-purple-400 text-white rounded-r-md pl-5 pr-5 border-l-0">
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
