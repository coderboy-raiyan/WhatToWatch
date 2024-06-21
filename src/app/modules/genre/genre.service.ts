import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import Movie from '../movie/movie.model';
import { TGenre } from './genre.interface';
import Genre from './genre.model';
import GenreUtils from './genre.utils';

const createGenreIntoDB = async (payload: TGenre) => {
    const { name } = payload;

    const slug = GenreUtils.generateGenreSlug(name);

    const genre = await Genre.findOne({ slug });
    if (genre) {
        throw new AppError(StatusCodes.BAD_REQUEST, `${name} genre already exists!`);
    }

    payload.slug = slug;
    const result = await Genre.create(payload);
    return result;
};

const getAllGenresFromDB = async () => {
    const result = await Genre.find({});
    return result;
};

const getSingleGenreFromDB = async (id: string) => {
    const result = await Genre.findById(id);
    return result;
};

const updateGenreIntoDB = async (id: string, { name }: TGenre) => {
    const slug = GenreUtils.generateGenreSlug(name);

    const genre = await Genre.findOne({ _id: id, slug });
    if (genre) {
        throw new AppError(StatusCodes.BAD_REQUEST, `${name} genre already exists!`);
    }

    const result = await Genre.findByIdAndUpdate(id, { name, slug }, { new: true });
    return result;
};

const deleteGenreFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const updatedMoviesGenre = await Movie.updateMany(
            { genre: id },
            { $pull: { genre: id } },
            { session }
        );

        if (!updatedMoviesGenre?.acknowledged) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete genre from movies!');
        }

        const deletedGenre = await Genre.findByIdAndDelete(id, { session });

        if (!deletedGenre) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete genre!');
        }

        await session.commitTransaction();
        await session.endSession();
        return deletedGenre;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const GenreServices = {
    createGenreIntoDB,
    getAllGenresFromDB,
    getSingleGenreFromDB,
    updateGenreIntoDB,
    deleteGenreFromDB,
};

export default GenreServices;
