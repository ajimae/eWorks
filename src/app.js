import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import routes from './routes';

const app = express();

// Application-Level Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);
app.use('*', async (req, res) => res.status(404).json({
  status: 'error',
  data: {
    message: 'resource not found on this server',
  },
}));

export default app;
