const supertest = require('supertest');
const { app, server } = require('../../../index');

const api = supertest(app);

test('¡Hello World! are returned as html', async () => {
    await api
        .get('/')
        .expect(200)
        .expect('Content-Type', /text\/html/);
});

afterAll(() => {
    server.close();
});