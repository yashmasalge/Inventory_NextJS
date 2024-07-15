import mongoose, { ConnectOptions } from 'mongoose';

const connectMongoDB = async ()=> {
  try {
    const mongoURI = process.env.MONGODB_URI as string;
    if (!mongoURI) {
      throw new Error('MongoDB URI not found in environment variables.');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log('Connected to MongoDB.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectMongoDB;
