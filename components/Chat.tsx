import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getApproval from "@/utils/getApproval";
import sendApproval from "@/utils/sendApproval";
import { toast } from 'react-toastify';
import VideocamIcon from '@mui/icons-material/Videocam';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  const { approve } = useSelector((state: any) => state.approved);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [sender, setSender] = useState(false);
  const [isSendButtonEnabled, setIsSendButtonEnabled] = useState(false);
  const [roomMessages, setRoomMessages] = useState<Message[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [receive_message, setReceiveMessage] = useState('');
  const token = localStorage.getItem('token');

  // Define the room name
  const roomName = "YourRoomName"; // Replace with your desired room name
  console.log(selectedUser?.selectedUser?._id, "selelelelle");
  const matchedMessage = approve.allApp.find(
    (message: Messagess) =>
      message.receiver === selectedUser?.selectedUser?.email
  );

  const sendApp = approve.sendApproved.find(
    (message: Messagess) =>
      message.sender === selectedUser?.selectedUser?.email
  );

  const socket: Socket = io();
  useEffect(() => {
    socket?.emit('addUser', users?._id);
    socket?.on('getUsers', users => {
      console.log('activeUsers :>> ', users);
    })
    socket?.on('getMessage', data => {
      console.log(data, "getMessagegetMessage");
    })
  }, [])

  async function socketInitializer() {
    await fetch("/api/chat/socket");

    socket.on("getMessage", (data) => {
      console.log(data, "this is received message");
      const newMessage: Message = { text: data.messageText, type: 'received' };
      setMessages([...messages, newMessage]);
      socket.on("join-room", (room, username) => {
        //@ts-ignore
        socket.join(room);
      });
      // Check if the received message is in the desired room
      if (data.room === roomName) {
        const newReceivedMessage: Message = { text: data.messageText, type: 'received' };
        setReceivedMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
      }
    });
  }

  useEffect(() => {
    socketInitializer();

    socket.emit("join-room", roomName, users.email);
  }, []);

  const action = async (e: string) => {
    console.log(e, "eeeeeeeeeeeeee");
    const send = await sendApproval(token, selectedUser?.selectedUser?.email, e);
    getApproval(token);
  }

  // const handleSendMessage = async () => {
  //   if (messageText) {
  //     const newMessage: Message = { text: messageText, type: 'sent' };
  //     setMessages([...messages, newMessage]);
  //     // Reset the messageText state after sending a message
  //     setMessageText('');
  //     setIsSendButtonEnabled(false);
  //     sendmessage();
  //   }
  // };
  const handleSendMessage = async () => {
    if (messageText) {
      const newMessage: Message = { text: messageText, type: 'sent' };
      setMessages([...messages, newMessage]);
      // Remove these lines to keep the button enabled after sending a message
      // setMessageText('');
      // setIsSendButtonEnabled(false);
      sendmessage();
    }
  };
  
  const _id = users?._id;
  const receiver = selectedUser?.selectedUser?._id;
  console.log(_id, "iiiiiiiiiii", receiver, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", selectedUser?.selectedUser?._id);

  const sendmessage = async () => {
    // Include the room name when emitting the message
    socket.emit("sendmessage", { messageText, receiver, _id });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessageText(text);
    setIsSendButtonEnabled(!!text);
  }
  console.log(roomMessages, "roomMessagesroomMessages", messages);

  return (
    <div className='chatt'>
      <div className="chat-container">
        <div className="chat-header">
          <img src={selectedUser?.selectedUser?.profilePic} alt="Receiver Avatar" className="receiver-avatar" />
          <h2>{selectedUser?.selectedUser?.firstname} {selectedUser?.selectedUser?.lastname}</h2>
          <div className="videocall">
            {users.email !== selectedUser?.selectedUser?.email ? (
              <Tooltip title="Video call">
                <IconButton>
                  <VideocamIcon className="videocall" fontSize="large" style={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            ) : null}
          </div>
          <div className='moreheader'>
            <Tooltip title="More">
              <IconButton>
                <MoreVertIcon className='moreheader' style={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="chat-messages">
          <div className="message-scroll">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type === 'sent' ? 'sent-message allsent': 'received-message' }`}
              >
                {message.text}
              </div>
            ))}
            {receivedMessages.map((message, index) => (
              <div
                key={index}
                className={`message received-message`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
        {!sendApp && users.email !== selectedUser?.selectedUser?.email && !matchedMessage ? (
          <button className="actionButton" onClick={(e) => action("Send")}>Send Request</button>
        ) : !sendApp && users.email !== selectedUser?.selectedUser?.email && matchedMessage.status === "pending" ? (
          <h3 className="disableText">Pending Request</h3>
        ) : !sendApp && users.email !== selectedUser?.selectedUser?.email && matchedMessage.status === "Send" ? (
          <h3 className="disableText">Already Send</h3>
        ) : !sendApp && users.email !== selectedUser?.selectedUser?.email && matchedMessage.status === "Approved" ? (
          <div className="message-input">
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
          </div>
        ) : null}

        {sendApp && !matchedMessage && users.email !== selectedUser?.selectedUser?.email && sendApp.status === "Send" ? (
          <button className="actionButton" onClick={(e) => action("Approved")}>Accept Request</button>
        ) : sendApp && users.email !== selectedUser?.selectedUser?.email && !matchedMessage && sendApp.status === "Approved" ? (
          <div className="message-input">
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
          </div>
        ) : null}
        {users.email === selectedUser?.selectedUser?.email && (
          <div className="message-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              className='inputmessage'
              onChange={(e: any) => {
                setMessageText(e.target.value);
                handleInputChange(e);
              }}
            />
            <button onClick={handleSendMessage} className="button-send">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
