import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    return mongoose.connect(process.env.MONGO_DB_URL || "mongodb://localhost:27017", {}).then((mongoose) => {
        console.log('Connected to MongoDB');
        return mongoose;
      });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
