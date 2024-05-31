/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import ApiError from '../errors/ApiError';
import { TErrorSources } from '../interface/error';

function globalErrorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    let statusCode: number = StatusCodes.OK;
    let message = 'Something went wrong!';
    let errorSources: TErrorSources = [];

    if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error.message,
            },
        ];
    } else if (error instanceof Error) {
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? error.stack : null,
    });
}

export default globalErrorHandler;
