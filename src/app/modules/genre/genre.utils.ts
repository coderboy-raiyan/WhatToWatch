import slugify from 'slugify';

function generateGenreSlug(name: string) {
    return slugify(name, { replacement: '-', lower: true });
}

const GenreUtils = {
    generateGenreSlug,
};

export default GenreUtils;
