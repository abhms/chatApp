import mongoose from "mongoose";


mongoose.connect(process.env.MONGODB_URI!);

export const { db: MongoClient } = mongoose.connection;

export default mongoose;