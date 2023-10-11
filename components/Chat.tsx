import React, { useState } from 'react';

const Chat = (selectedUser:any) => {
  const [messages, setMessages] = useState([
    { text: 'Hello, how are you?', sent: false },
    { text: 'I\'m good, thanks!', sent: true },
    // Add more messages as needed
  ]);
console.log(selectedUser.selectedUser,"selectedUser");
  return (
    <div className='chatt' >    
    <div className="chat-container">
      <div className="chat-header">
        <img src={selectedUser.selectedUser.img} alt="Receiver Avatar" className="receiver-avatar" />
       
        <h2>{selectedUser.selectedUser.name}</h2> 
      </div>
      <div className="chat-messages">
        <div className="message-scroll">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sent ? 'sent-message' : 'received-message'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="message-input">
        {/* Add your input form here */}
        <input/>
      </div>
    </div>
    </div>
  );
};

export default Chat;
