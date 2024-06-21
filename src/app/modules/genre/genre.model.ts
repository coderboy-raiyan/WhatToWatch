import { Schema, model } from 'mongoose';
import { TGenre } from './genre.interface';

const genreSchema = new Schema<TGenre>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
});

const Genre = model<TGenre>('Genre', genreSchema);

export default Genre;
