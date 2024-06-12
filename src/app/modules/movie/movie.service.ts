import { StatusCodes } from 'http-status-codes';
import ApiError from '../../errors/ApiError';
import { TMovie } from './movie.interface';
import Movie from './movie.model';
import MovieUtils from './movie.utils';

const createMovieIntoDB = async (payload: TMovie) => {
    const { title } = payload;

    const isMoviesExists = await Movie.findOne({ title });

    if (isMoviesExists) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Movie already exists!');
    }
    const generatedSlug = MovieUtils.generateMovieSlug(payload);
    payload.slug = generatedSlug;

    const result = await Movie.create(payload);
    return result;
};

const getAllMoviesFromDB = async () => {
    const result = await Movie.find({});
    return result;
};

const getSingleMovieFromDB = async (slug: string) => {
    const result = await Movie.findOne({ slug });
    return result;
};

const updateMovieIntoDB = async (id: string, payload: Partial<TMovie>) => {
    const { title, releaseDate, slug } = payload;

    if (slug) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'You cannot set slug directly!');
    }

    const movie = await Movie.findById(id);

    if (!movie) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Movie already exists!');
    }

    if (title || releaseDate) {
        const generatedSlug = MovieUtils.generateMovieSlug({
            title: title || movie.title,
            releaseDate: releaseDate || movie.releaseDate,
        });
        payload.slug = generatedSlug;
    }

    const result = await Movie.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteMovieFromDB = async (id: string) => {
    const result = await Movie.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
};

const MovieServices = {
    createMovieIntoDB,
    getAllMoviesFromDB,
    getSingleMovieFromDB,
    deleteMovieFromDB,
    updateMovieIntoDB,
};

export default MovieServices;
