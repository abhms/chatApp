// models/Message.ts
import mongoose  from './db';


const ChatSchema = new mongoose.Schema({
    firstname: String,
    lastname:String,
    email: String,
    password: String,
    profilePic:String
  },
  {
    timestamps: true,
  });
  
  const chat = mongoose.models.chats || mongoose.model("chats", ChatSchema);
  
  export default chat;
