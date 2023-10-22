import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getApproval from "@/utils/getApproval"
import sendApproval from "@/utils/sendApproval"
import { toast } from 'react-toastify';

interface Message {
  text: string;
  type: 'sent' | 'received';
}
interface Messagess {
  createdAt: string;
  receiver: string;
  sender: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
const Chat = (selectedUser: any) => {
  const { users } = useSelector((state: any) => state.user);
  const { approve } = useSelector((state: any) => state.approved)
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [sender ,setSender]=useState(false)
  const [isSendButtonEnabled, setIsSendButtonEnabled] = useState(false);
  const [receive_message, setreceive_message] = useState()
  var token = localStorage.getItem('token'); 
  console.log(token,"ttttttttttttt");
  const matchedMessage = approve.allApp.find(
    (message: Messagess) =>
    message.receiver === selectedUser?.selectedUser?.email,
   
  );
  const sendApp = approve.sendApproved.find(
    (message: Messagess) =>
    message.sender === selectedUser?.selectedUser?.email,
   
  );
  console.log(matchedMessage, "apprrprp", sendApp);

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

  const action=async (e:string)=>{
    console.log(e,"eeeeeeeeeeeeee");
  const send=  await sendApproval(token,selectedUser?.selectedUser?.email,e)
  // toast("send.data.message", { hideProgressBar: true, autoClose: 2000, type: 'success' })
     getApproval(token)
  }

  const handleSendMessage = async () => {
    if (messageText) {
      const newMessage: Message = { text: messageText, type: 'sent' };
      setMessages([...messages, newMessage]);
      sendmessage()
      setMessageText('');
      setIsSendButtonEnabled(false);
    }
  };
  const email = users?.email
  const receiver = selectedUser?.selectedUser?.name
  const sendmessage = async () => {
    console.log(messageText, "selectedUser444444444");
    socket.emit("send-message", { messageText, receiver, email });
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
        {!sendApp && users.email !== selectedUser?.selectedUser?.email && !matchedMessage ? <button className="actionButton" onClick={(e)=>action("Send")}>Send Request</button> :!sendApp&& users.email !== selectedUser?.selectedUser?.email && matchedMessage.status === "pending" ? <h3 className="disableText">Pending Request</h3> : !sendApp&&users.email !== selectedUser?.selectedUser?.email && matchedMessage.status === "Send" ? <h3 className="disableText">Already Send</h3> : !sendApp&&users.email !== selectedUser?.selectedUser?.email && matchedMessage.status === "Approved" ? <div className="message-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            className='inputmessage'
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage} disabled={!isSendButtonEnabled} className="button-send">
            Send
          </button>
        </div> : null}

        {sendApp && !matchedMessage &&users.email !== selectedUser?.selectedUser?.email && sendApp.status==="Send"?<button className="actionButton">Accept Request</button>:sendApp && users.email !== selectedUser?.selectedUser?.email && !matchedMessage &&sendApp.status==="Approved"?<div className="message-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            className='inputmessage'
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage} disabled={!isSendButtonEnabled} className="button-send">
            Send
          </button>
        </div>:null}
        {users.email === selectedUser?.selectedUser?.email && <div className="message-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            className='inputmessage'
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage} disabled={!isSendButtonEnabled} className="button-send">
            Send
          </button>
        </div>}
      </div>
    </div>
  );
};

export default Chat;
