import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connectDb = () => {
  const url = process.env.NODE_ENV == 'test' ? process.env.DATABASE_TEST_URL : process.env.DATABASE_URL
  return mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
};

export { connectDb };
