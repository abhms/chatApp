
import { Server } from "socket.io";
import Chat from "../../../models/Message";
export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Client connected");
    
    socket.on("send-message", async(data) => {
      io.emit("receive-message", data); 
    try {
    const newMessage=new Chat({
        receiver:data.receiver,
         sender:data.email,
        message:data.messageText
    })
 
        await newMessage.save();
      } catch (error) {
        console.error("Error saving message:", error);
      }
      console.log("Received message:", data);
    });
  });

  console.log("Setting up socket");
  res.end();
}