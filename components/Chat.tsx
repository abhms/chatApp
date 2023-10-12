import React, { useState } from 'react';

interface Message {
  text: string;
  type: 'sent' | 'received';
}

const Chat = (selectedUser: any) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello, how are you?', type: 'received' },
    { text: 'I\'m good, thanks9999999999999!', type: 'sent' },
    // Add more messages as needed
  ]);
  const [messageText, setMessageText] = useState('');
  const [isSendButtonEnabled, setIsSendButtonEnabled] = useState(false);

  const handleSendMessage = () => {
    if (messageText) {
      const newMessage: Message = { text: messageText, type: 'sent' };
      setMessages([...messages, newMessage]);
      // Logic to send the message to the recipient here

      // Clear the input field and disable the send button
      setMessageText('');
      setIsSendButtonEnabled(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessageText(text);
    setIsSendButtonEnabled(!!text);
  };

  console.log(selectedUser.selectedUser, "selectedUser");

  return (
    <div className='chatt'>
      <div className="chat-container">
        <div className="chat-header">
          <img src={selectedUser?.selectedUser?.img} alt="Receiver Avatar" className="receiver-avatar" />
          <h2>{selectedUser?.selectedUser?.name}</h2>
        </div>
        <div className="chat-messages">
          <div className="message-scroll">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type === 'sent' ? 'sent-message allsent' : 'received-message'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
        <div className="message-input">
  <input
    type="text"
    placeholder="Type a message..."
    value={messageText}
    className='inputmessage' // Apply the inputmessage style here
    onChange={handleInputChange}
  />
  <button onClick={handleSendMessage} disabled={!isSendButtonEnabled} className="button-send">
    Send
  </button>
</div>
      </div>
    </div>
  );
};

export default Chat;
