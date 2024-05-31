import { Response } from 'express';

type TData<T> = {
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
};

function sendResponse<T>(res: Response, data: TData<T>) {
    const { success, message, statusCode, data: result } = data;
    return res.status(statusCode).json({
        success,
        message,
        data: result,
    });
}

export default sendResponse;
