import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TMovie } from './movie.interface';
import Movie from './movie.model';
import MovieUtils from './movie.utils';

const createMovieIntoDB = async (payload: TMovie) => {
    const { title, releaseDate } = payload;

    const isMoviesExists = await Movie.findOne({ title, releaseDate });

    if (isMoviesExists) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Movie already exists!');
    }
    const generatedSlug = MovieUtils.generateMovieSlug(payload);
    payload.slug = generatedSlug;

    const result = await Movie.create(payload);
    return result;
};

const getAllMoviesFromDB = async (query: Record<string, unknown>) => {
    const MovieQueryModel = new QueryBuilder(Movie, query)
        .search(['title', 'description', 'genre'])
        .filter()
        .paginate()
        .sort()
        .fields();
    const result = await MovieQueryModel.QueryModel;
    return result;
};

const getSingleMovieFromDB = async (slug: string) => {
    const result = await Movie.findOne({ slug });
    return result;
};

const updateMovieIntoDB = async (id: string, payload: Partial<TMovie>) => {
    const { title, releaseDate, slug } = payload;

    if (slug) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'You cannot set slug directly!');
    }

    const movie = await Movie.findById(id);

    if (!movie) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Movie already exists!');
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
