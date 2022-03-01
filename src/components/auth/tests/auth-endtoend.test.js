const supertest = require('supertest');
const { app, server } = require('../../../index');

const api = supertest(app);

describe('POST /auth/login', () => {
    test('Login by username successful', async () => {
        const body = {
            username: "agustin",
            password: "123456"
        };
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);
            // TODO: Validar que devuelva el token y el success true
    });

    test('Login by email successful', async () => {
        const body = {
            username: "agustinedura2n@gmail.com",
            password: "123456"
        };
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);
            // TODO: Validar que devuelva el token y el success true
    });

    test('Login with password wrong using username', async () => {
        const body = {
            username: "agustin",
            password: "123456789"
        };
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .expect({ success: false, message: 'Credenciales inválidas' });
    });

    test('Login with password wrong using email', async () => {
        const body = {
            username: "agustinedura2n@gmail.com",
            password: "123456789"
        };
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .expect({ success: false, message: 'Credenciales inválidas' });
    });

    test('Login with an username doesnt exists', async () => {
        const body = {
            username: "username-fake",
            password: "123456789"
        };
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .expect({ success: false, message: 'Credenciales inválidas' });
    });

    test('Login with an email doesnt exists', async () => {
        const body = {
            username: "username-fake@gmail.com",
            password: "123456789"
        };
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .expect({ success: false, message: 'Credenciales inválidas' });
    });

    test('Login without body', async () => {
        const body = {};
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({ success: false, message: 'Credenciales inválidas' });
    });

    test('Login without username', async () => {
        const body = {
            password: "123456789"
        };
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({ success: false, message: 'Credenciales inválidas' });
    });

    test('Login without password', async () => {
        const body = {
            username: "agustin"
        };
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({ success: false, message: 'Credenciales inválidas' });
    });

    test('Login with username empty', async () => {
        const body = {
            username: "",
            password: "123456789"
        };
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({ success: false, message: 'Credenciales inválidas' });
    });

    test('Login with password empty', async () => {
        const body = {
            username: "agustin",
            password: ""
        };
        await api
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({ success: false, message: 'Credenciales inválidas' });
    });

    // TODO: LOGIN WITH SQL INJECT

});

// TODO: REGISTER TEST

afterAll(() => {
    server.close();
});