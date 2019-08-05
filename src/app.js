import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import routes from './routes';
import { errorResponse } from './helpers/Response';

const app = express();

// Application-Level Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);
app.use('*', async (req, res) => errorResponse(res, 404, 'resource not found on this server'));

export default app;
