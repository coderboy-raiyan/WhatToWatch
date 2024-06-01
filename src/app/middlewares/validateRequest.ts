import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsyncError from '../utils/catchAsync';

function validateRequest(zodSchema: AnyZodObject) {
    return catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        await zodSchema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        next();
    });
}

export default validateRequest;
