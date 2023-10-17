import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
interface Message {
  text: string;
  type: 'sent' | 'received';
}

const Chat = (selectedUser: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isSendButtonEnabled, setIsSendButtonEnabled] = useState(false);
  const [receive_message,setreceive_message]=useState()
  // const socket = useRef();
  const socket = io("http://localhost:8000"); 
  console.log(socket,"sockettt")
  const socketRef = useRef()
  // useEffect(() => {
  //   //@ts-ignore 
  //   // if(socket.connected){

  //   socket.on('connect', () => {
  //     console.log('Connected to chat server');
  //   });

  //   socket.on('message', (message: string) => {
  //     const newMessage: Message = { text: message, type: 'received' };
  //     setMessages([...messages, newMessage]);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from chat server');
  //   });
  // // }

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

 useEffect(() => {
    // Listen for 'message' events from the server
    socket.on('message', (message) => {
      // Update the state to display the received message
      console.log(message,"backendmessage");
    });
    socket.on("messageusingemail",(msg)=>{
      console.log(msg,"messageusingemail");
    })

    // Clean up the event listener when the component unmounts
    // return () => {
    //   socket.off('message');
    //   socket.off('messageusingemail');
    // };
  }, [messages]);


  const handleSendMessage = async() => {
    if (messageText) {
      const newMessage: Message = { text: messageText, type: 'sent' };
      setMessages([...messages, newMessage]);
  
      // Send the message to the backend
      sendmessage()
      // if (socket.current) {
      //   //@ts-ignore
      //   socket.current.emit('message', newMessage.text);
      // }
      // const targetSocketId = 'TARGET_USER_SOCKET_ID';
      // socket.emit('message', newMessage.text, targetSocketId);
      // Clear the input field and disable the send button
      setMessageText('');
      setIsSendButtonEnabled(false);
    }
  };
const sendmessage=async()=>{

  // socket.emit("message","hello",socket.id)
  
}
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessageText(text);
    setIsSendButtonEnabled(!!text);
  };

  console.log(receive_message, "selectedUser");

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
