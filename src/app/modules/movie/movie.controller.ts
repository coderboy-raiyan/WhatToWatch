import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsyncError from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import MovieServices from './movie.service';

const createMovie = catchAsyncError(async (req: Request, res: Response) => {
    const result = await MovieServices.createMovieIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Movie created Successfully',
        data: result,
    });
});
const getAllMovies = catchAsyncError(async (req: Request, res: Response) => {
    const result = await MovieServices.getAllMoviesFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Movies retrieved Successfully',
        data: result,
    });
});
const getSingleMovie = catchAsyncError(async (req: Request, res: Response) => {
    const result = await MovieServices.getSingleMovieFromDB(req.params.slug);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Movie retrieved Successfully',
        data: result,
    });
});
const searchMovies = catchAsyncError(async (req: Request, res: Response) => {
    const result = await MovieServices.searchMoviesFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Movies retrieved Successfully',
        data: result,
    });
});

const updateMovie = catchAsyncError(async (req: Request, res: Response) => {
    const result = await MovieServices.updateMovieIntoDB(req.params.id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Movie updated Successfully',
        data: result,
    });
});
const deleteMovie = catchAsyncError(async (req: Request, res: Response) => {
    const result = await MovieServices.deleteMovieFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Movie deleted Successfully',
        data: result,
    });
});

const MovieControllers = {
    createMovie,
    getAllMovies,
    getSingleMovie,
    deleteMovie,
    updateMovie,
    searchMovies,
};

export default MovieControllers;
