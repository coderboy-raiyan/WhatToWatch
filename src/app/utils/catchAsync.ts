import { NextFunction, Request, RequestHandler, Response } from 'express';

function catchAsyncError(fn: RequestHandler) {
    return function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
}

export default catchAsyncError;
