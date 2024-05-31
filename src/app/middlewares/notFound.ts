import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../errors/ApiError';

function notFound(req: Request, res: Response, next: NextFunction) {
    next(new ApiError(StatusCodes.NOT_FOUND, 'API not found'));
}

export default notFound;
