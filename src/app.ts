import express, { Application } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { apiRoutes } from './routes/api.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(apiRoutes);

export { app };
