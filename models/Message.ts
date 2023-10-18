// models/Message.ts
import mongoose  from './db';


const ChatSchema = new mongoose.Schema({
    sender: String,
    receiver:String,
    message: String,
  },
  
  {
    timestamps: true,
  });
  
  const chat = mongoose.models.chats || mongoose.model("chats", ChatSchema);
  
  export default chat;
