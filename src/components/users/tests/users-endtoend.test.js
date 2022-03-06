const request         = require('supertest');
const { app, server } = require('../../../index');
const User            = require('../models/user');

const api = request(app);

beforeEach(async () => {
    // FIXME: Warning with production database
    await User.destroy({where: {}});
    await User.create({
        id: 1,
        username: "agustin-user",
        password: "$2a$10$k5C5nQxeDS3TSvD/Ya/rm.OWgdlaMTMeyc1So4JVUgLpQuiwvTObu", // 123456
        email: "agustineduran@gmail.com",
        name: "Agustín",
        surname: "Durán",
        phone: "2964547877"
    });
    await User.create({
        id: 2,
        username: "agustin-admin",
        password: "$2a$10$k5C5nQxeDS3TSvD/Ya/rm.OWgdlaMTMeyc1So4JVUgLpQuiwvTObu", // 123456
        email: "agustineduran-admin@gmail.com",
        name: "Agustín",
        surname: "Durán",
        phone: "2964547877",
        roles: JSON.stringify(["ROLE_USER", "ROLE_ADMIN"])
    });
});

describe('GET /api/users/', () => {
    test('Get all users successfuly', async () => {
        const body = {
            username: "agustin-admin",
            password: "123456"
        };
        const responseLogin = await 
            api.post('/api/auth/login')
               .send(body)
               .set('Accept', 'application/json')
               .expect('Content-Type', /json/);

        const token = responseLogin.body.token;

        const response = await 
            api.get('/api/users/')
               .set('Accept', 'application/json')
               .set('authorization', `${token}`)
               .expect('Content-Type', /json/);
        expect(200);
        expect(response.body.success).toBeTruthy();
        expect(response.body.users).toBeDefined();
    });

    test('Forbidden access if doesnt has ROLE_ADMIN', async () => {
        const body = {
            username: "agustin-user",
            password: "123456"
        };
        const responseLogin = await 
            api.post('/api/auth/login')
               .send(body)
               .set('Accept', 'application/json')
               .expect('Content-Type', /json/);

        const token = responseLogin.body.token;

        const response = await 
            api.get('/api/users/')
               .set('Accept', 'application/json')
               .set('authorization', 'application/json')
               .set('authorization', `${token}`)
               .expect('Content-Type', /json/);
        expect(403);
        expect(response.body.success).toBeFalsy();
        expect(response.body.message).toBeDefined();
    });

    test('Forbidden access if doesnt has token', async () => {
        const response = await 
            api.get('/api/users/')
               .set('Accept', 'application/json')
               .set('authorization', 'application/json')
               .expect('Content-Type', /json/);
        expect(403);
        expect(response.body.success).toBeFalsy();
        expect(response.body.message).toBeDefined();
    });
});

describe('GET /api/users/{id}', () => {
    test('Get same user successfuly by ROLE_USER', async () => {
        const body = {
            username: "agustin-user",
            password: "123456"
        };
        const responseLogin = await 
            api.post('/api/auth/login')
               .send(body)
               .set('Accept', 'application/json')
               .expect('Content-Type', /json/);

        const token = responseLogin.body.token;

        const response = await 
            api.get('/api/users/1')
               .set('Accept', 'application/json')
               .set('authorization', `${token}`)
               .expect('Content-Type', /json/);
        expect(200);
        expect(response.body.success).toBeTruthy();
        expect(response.body.user).toBeDefined();
    });

    test('Get other user failed by ROLE_USER', async () => {
        const body = {
            username: "agustin-user",
            password: "123456"
        };
        const responseLogin = await 
            api.post('/api/auth/login')
               .send(body)
               .set('Accept', 'application/json')
               .expect('Content-Type', /json/);

        const token = responseLogin.body.token;

        const response = await 
            api.get('/api/users/2')
               .set('Accept', 'application/json')
               .set('authorization', `${token}`)
               .expect('Content-Type', /json/);
        expect(403);
        expect(response.body.success).toBeFalsy();
        expect(response.body.message).toBeDefined();
    });

    test('Get other user successfuly by ROLE_ADMIN', async () => {
        const body = {
            username: "agustin-admin",
            password: "123456"
        };
        const responseLogin = await 
            api.post('/api/auth/login')
               .send(body)
               .set('Accept', 'application/json')
               .expect('Content-Type', /json/);

        const token = responseLogin.body.token;

        const response = await 
            api.get('/api/users/1')
               .set('Accept', 'application/json')
               .set('authorization', `${token}`)
               .expect('Content-Type', /json/);
        expect(200);
        expect(response.body.success).toBeTruthy();
        expect(response.body.user).toBeDefined();
    });

    test('Get same user successfuly by ROLE_ADMIN', async () => {
        const body = {
            username: "agustin-admin",
            password: "123456"
        };
        const responseLogin = await 
            api.post('/api/auth/login')
               .send(body)
               .set('Accept', 'application/json')
               .expect('Content-Type', /json/);

        const token = responseLogin.body.token;

        const response = await 
            api.get('/api/users/2')
               .set('Accept', 'application/json')
               .set('authorization', `${token}`)
               .expect('Content-Type', /json/);
        expect(200);
        expect(response.body.success).toBeTruthy();
        expect(response.body.user).toBeDefined();
    });

    test('Get error by param if id is not an integer', async () => {
        const body = {
            username: "agustin-admin",
            password: "123456"
        };
        const responseLogin = await 
            api.post('/api/auth/login')
               .send(body)
               .set('Accept', 'application/json')
               .expect('Content-Type', /json/);

        const token = responseLogin.body.token;

        const response = await 
            api.get('/api/users/a')
               .set('Accept', 'application/json')
               .set('authorization', `${token}`)
               .expect('Content-Type', /json/);
        expect(422);
        expect(response.body.success).toBeFalsy();
        expect(response.body.message).toBeDefined();
    });

    test('Get error if does not exists the user', async () => {
        const body = {
            username: "agustin-admin",
            password: "123456"
        };
        const responseLogin = await 
            api.post('/api/auth/login')
               .send(body)
               .set('Accept', 'application/json')
               .expect('Content-Type', /json/);

        const token = responseLogin.body.token;

        const response = await 
            api.get('/api/users/999')
               .set('Accept', 'application/json')
               .set('authorization', `${token}`)
               .expect('Content-Type', /json/);
        expect(404);
        expect(response.body.success).toBeFalsy();
        expect(response.body.message).toBeDefined();
    });
});

afterAll(() => {
    server.close();
});