import { StatusCodes } from 'http-status-codes';
import catchAsyncError from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import GenreServices from './genre.service';

const createGenre = catchAsyncError(async (req, res) => {
    const result = await GenreServices.createGenreIntoDB(req.body);
    sendResponse(res, {
        success: true,
        message: 'Genre created Successfully',
        statusCode: StatusCodes.CREATED,
        data: result,
    });
});
const getAllGenres = catchAsyncError(async (req, res) => {
    const result = await GenreServices.getAllGenresFromDB();
    sendResponse(res, {
        success: true,
        message: 'Genres retrieved Successfully',
        statusCode: StatusCodes.OK,
        data: result,
    });
});
const getSingeGenre = catchAsyncError(async (req, res) => {
    const result = await GenreServices.getSingleGenreFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        message: 'Genre retrieved Successfully',
        statusCode: StatusCodes.OK,
        data: result,
    });
});
const updateGenre = catchAsyncError(async (req, res) => {
    const result = await GenreServices.updateGenreIntoDB(req.params.id, req.body);
    sendResponse(res, {
        success: true,
        message: 'Genre updated Successfully',
        statusCode: StatusCodes.OK,
        data: result,
    });
});
const deleteGenre = catchAsyncError(async (req, res) => {
    const result = await GenreServices.deleteGenreFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        message: 'Genre deleted Successfully',
        statusCode: StatusCodes.OK,
        data: result,
    });
});

const GenreControllers = {
    createGenre,
    getAllGenres,
    deleteGenre,
    updateGenre,
    getSingeGenre,
};

export default GenreControllers;
