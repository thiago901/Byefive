import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import '@config/connectionDatabase';
import '@shared/container';
import AppError from '@shared/errors/AppError';

import routes from './routes';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3333', /\.localhost:3000$/],
  }),
);
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Server Internal Error',
  });
});

app.listen(3333, () => {
  console.log('Server started in port 3333!');
});
