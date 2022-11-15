import mongoose from "mongoose";

const connection = {};

const connectDB = async () => {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGO_URI);
  connection.isConnected = db.connections[0].readyState;
  console.log(`Connected to DB: ${db.connections[0].name}`);
};

export default connectDB;
