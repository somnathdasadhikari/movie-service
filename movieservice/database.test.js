const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create movie', async () => {
    expect.assertions(1);
    const movie = await db.Movies.create({
        id: 1,
        name: 'Bobbie',
        description: 'Draper',
        release_date: '2020-08-14',
        duration: '2hr',
        rating: '5',
        genre: 'India'
    });
    expect(movie.id).toEqual(1);
});

test('get movie', async () => {
    expect.assertions(2);
    const movie = await db.Movies.findByPk(1);
    expect(movie.name).toEqual('Bobbie');
    expect(movie.rating).toEqual('5');
});

test('delete movie', async () => {
    expect.assertions(1);
    await db.Movies.destroy({
        where: {
            id: 1
        }
    });
    const movie = await db.Movies.findByPk(1);
    expect(movie).toBeNull();
});


afterAll(async () => {
    await db.sequelize.close();
});