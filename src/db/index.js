/* eslint-disable no-nested-ternary */
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connectDb = () => {
  const { NODE_ENV, DATABASE_TEST_URL, DATABASE_URL } = process.env;
  const url = NODE_ENV === 'test' ? DATABASE_TEST_URL : (NODE_ENV === 'development' ? 'mongodb://127.0.0.1:27017/eWorksDB' : DATABASE_URL);
  return mongoose.connect(url, {
    useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,
  });
};

export { connectDb };
