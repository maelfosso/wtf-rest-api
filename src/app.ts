import express, { Application } from 'express';
import cors from 'cors';
import 'express-async-errors';
import apiRoutes from './routes/api.routes';
import errorHandler from './middlewares/error-handler';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(apiRoutes);

app.use(errorHandler);

export { app };
