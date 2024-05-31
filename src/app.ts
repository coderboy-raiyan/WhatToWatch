import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['*'], credentials: true }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ success: true, message: 'Server is healthy' });
});

// routes
app.use('/api/v1', router);

// not found
app.use(notFound);

// globalErrorHandler
app.use(globalErrorHandler);

export default app;
