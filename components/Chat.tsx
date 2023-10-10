import React from 'react';

const Chat = () => {
  const messages = [
    { text: 'Hello, how are you?', sent: true },
    { text: 'I\'m good, thanks!', sent: false },
    // Add more messages as needed
  ];

  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.sent ? 'sent-message' : 'received-message'}`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default Chat;
