import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Please check your MONGO_URI and MongoDB Atlas IP Whitelist.');
    // Do not use process.exit(1) so Railway server stays alive and returns 500 instead of 502
  }
};

export default connectDB;
