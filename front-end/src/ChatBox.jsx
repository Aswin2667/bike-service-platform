import React, { useState } from 'react';

const ChatBox = ({ isOpen, toggleChat }) => {

  const messages = [
    {
      sender:"sender",
      text:"hello"
  }, {
    sender:"reciver",
    text:"hello"
}, {
  sender:"sender",
  text:"deiii"
}, {
  sender:"sender",
  text:"hello"
}, {
  sender:"reciver",
  text:"bye"
}, {
  sender:"sender",
  text:"hello"
},
  
  ]
  return (
    <div className={`fixed right-6 flex flex-col justify-between  w-72 bg-purple-900 border h-1/2 border-gray-300 rounded-lg shadow-lg block`}>
      <div className="bg-gray-900 p-4  bg-gray- flex justify-between rounded-t-lg">
        <h2 className="text-xl text-white font-semibold">Chat</h2>
        <button onClick={toggleChat} className="float-right text-gray-600 text-red-800">
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
      <div className="p-4 h-max overflow-y-auto">
      {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.sender === 'sender' ? 'text-right' : 'text-left'}`}
          >
            <p className={`inline-block px-3 py-1 rounded-lg ${message.sender === 'sender' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message"
          className="w-full p-2 focus:outline-none  rounded-l-lg"
        />
        <div className='bg-white text-black h-full flex items-center rounded-r-lg p-3'><ion-icon name="send" className="text-blue-500 text-xl ml-2 cursor-pointer hover:text-blue-700" />
</div>
      </div>
    </div>
  );
};

export default ChatBox;
