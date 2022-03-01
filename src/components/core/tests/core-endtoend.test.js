const supertest = require('supertest');
const { app, server } = require('../../../index');

const api = supertest(app);

describe('Server general performance', () => {
    test('¡Hello World! are returned as html', async () => {
        await api
            .get('/')
            .expect(200)
            .expect('Content-Type', /text\/html/);
    });

    test('Get 404 Not Found for random resouce nonexistent', async () => {
        await api
            .get('/this-is-random-resource')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect({ success: false, message: 'El recurso solicitado no existe o fue eliminado' });
    });
});

afterAll(() => {
    server.close();
});