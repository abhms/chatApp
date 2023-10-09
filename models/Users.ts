import mongoose from "./db";

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname:String,
  email: String,
  password: String,
  profilePic:String
},
{
  timestamps: true,
});

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
