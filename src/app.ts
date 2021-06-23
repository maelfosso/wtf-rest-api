import express, { Application } from 'express';
import cors from 'cors';
import 'express-async-errors';

const app: Application = express();

app.use(express.json());
app.use(cors());

export { app };
