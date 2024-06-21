import { z } from 'zod';

const createGenreValidationSchema = z.object({
    body: z.object({
        name: z.string().max(20, { message: 'Genre must be less than 20 words' }),
    }),
});
const updateGenreValidationSchema = z.object({
    body: z.object({
        name: z.string().max(20, { message: 'Genre must be less than 20 words' }),
    }),
});

const GenreValidations = {
    createGenreValidationSchema,
    updateGenreValidationSchema,
};

export default GenreValidations;
