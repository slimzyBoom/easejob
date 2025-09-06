import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI as string;



const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected succesfully")
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default connectDB;
