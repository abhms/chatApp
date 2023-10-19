import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';
interface Message {
  text: string;
  type: 'sent' | 'received';
}

const Chat = (selectedUser: any) => {
  const { users } = useSelector((state: any) => state.user);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isSendButtonEnabled, setIsSendButtonEnabled] = useState(false);
  const [receive_message, setreceive_message] = useState()
  // const socket = useRef();
  const socket: Socket = io();
  async function socketInitializer() {
    await fetch("/api/chat/socket");

    console.log(socket, "sosooso");
    socket.on("receive-message", (data) => {
      console.log(data, "this is received message");
    });
  }

  useEffect(() => {
    socketInitializer()
  }, [])


  const handleSendMessage = async () => {
    if (messageText) {
      const newMessage: Message = { text: messageText, type: 'sent' };
      setMessages([...messages, newMessage]);
      sendmessage()
      setMessageText('');
      setIsSendButtonEnabled(false);
    }
  };
  const email=users?.email
  const receiver=selectedUser?.selectedUser?.name
  const sendmessage = async () => {
    console.log(messageText, "selectedUser444444444");
    socket.emit("send-message", {messageText,receiver,email});
  }

  console.log(messages, "messageTextmessageText", messageText);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessageText(text);
    setIsSendButtonEnabled(!!text);
  };

  console.log(messageText, "selectedUser");

  return (
    <div className='chatt'>
      <div className="chat-container">
        <div className="chat-header">
          <img src={selectedUser?.selectedUser?.profilePic} alt="Receiver Avatar" className="receiver-avatar" />
          <h2>{selectedUser?.selectedUser?.firstname} {selectedUser?.selectedUser?.lastname}</h2>
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
