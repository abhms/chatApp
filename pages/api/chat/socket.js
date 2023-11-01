import { Server } from "socket.io";
import Chat from "../../../models/Message";
import User from "../../../models/Users"
export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }
  let allusers = [];

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);
    socket.on('addUser', userId => {
      const isUserExist = allusers.find(user => user.userId === userId);
      if (!isUserExist) {
        const user = { userId, socketId: socket.id };
        allusers.push(user);
        io.emit('getUsers', allusers);
      }
    });
    // console.log(allusers,"usersusers");
    socket.on("sendmessage", async ({ messageText, receiver, _id }) => {
      console.log("Received message:", messageText, receiver, _id);
      try {
        console.log("Received message:", messageText, receiver, _id);
        // console.log(dmessageText, receiver, _id ,"datat.reciiieiei");
        const rec = receiver;
        const recer = allusers.find(user =>
          // console.log(user,"userrr"))
          user.userId === rec);
        const sender = allusers.find(user => user.userId === _id);
        const user = await User.findById(_id);
        const re = await User.findById(receiver)
        console.log(user, "jzshfkjsdhfkjshdfkjhskdj", re);
        if (recer) {
          console.log("1111");
          io.to(receiver.socketId).to(recer.socketId).emit('getMessage', {
            _id,
            messageText,
            receiver,
            // allusers: { id: user._id, fullName: user.fullName, email: user.email }
          });
          const newMessage = new Chat({
            receiver: re.email,
            sender: user.email,
            message: messageText,
          });

          await newMessage.save();

        } else {
          console.log("11122221");

          io.to(sender.socketId).emit('getMessage', {
            _id,
            messageText,

            receiver,
            // user: { id: user._id, fullName: user.fullName, email: user.email }
          });
        }
        console.log(recer, "receiverreceiver");

      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.join(socket.id); // Create a room with the socket's ID

    socket.on("private-message", (targetSocketId, data) => {
      try {
        // Use the targetSocketId to send a private message to the specific client
        io.to(targetSocketId).emit("receive-private-message", data);

        console.log("Sent a private message to", targetSocketId, ":", data);
      } catch (error) {
        console.error("Error sending private message:", error);
      }
    });
    socket.on('disconnect', () => {
      allusers = allusers.filter(user => user.socketId !== socket.id);
      io.emit('getallusers', allusers);
  });
  });

  console.log("Setting up socket");
  res.end();
}
