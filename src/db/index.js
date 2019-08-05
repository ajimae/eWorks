/* eslint-disable no-nested-ternary */
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connectDb = () => {
  const { NODE_ENV } = process.env;
  const url = NODE_ENV === 'test' ? process.env.DATABASE_TEST_URL : (NODE_ENV === 'development' ? 'mongodb://127.0.0.1:27017/eWorksDB' : process.env.DATABASE_URL);
  return mongoose.connect(url, {
    useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,
  });
};

export { connectDb };
