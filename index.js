/* eslint-disable import/no-mutable-exports */
import dotenv from 'dotenv';

import server from './src/app';
import { connectDb } from './src/db';

dotenv.config();

// Start
let connection;
connectDb().then(async (connectionInstance) => {
  connection = connectionInstance;
  server.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server listening on port ${process.env.PORT}`);
  });
});

export { server, connection };
