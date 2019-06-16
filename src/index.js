import dotenv from 'dotenv';
import app from './app';
import { connectDb } from './db';

dotenv.config();

// Start
connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`server listening on port ${process.env.PORT}`),
  );
});
