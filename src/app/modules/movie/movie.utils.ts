import slugify from 'slugify';
import { v5 } from 'uuid';
import { TMovie } from './movie.interface';

// slug = avengers-endgame-9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d

const generateMovieSlug = (movie: Partial<TMovie>) => {
    const { title, releaseDate } = movie;
    const uuid = v5(title + releaseDate, v5.URL);
    const slug = `${slugify(title, { replacement: '-', remove: undefined, lower: true, trim: true })}-${uuid}`;

    return slug;
};

const MovieUtils = {
    generateMovieSlug,
};

export default MovieUtils;
