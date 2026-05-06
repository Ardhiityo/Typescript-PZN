import prisma from "../src/app/prisma";
import web from "../src/app/web";
import supertest from "supertest";

beforeAll(async () => {
    await prisma.$connect();
});

beforeEach(async () => {
    await prisma.user.deleteMany({});
})

afterAll(async () => {
    await prisma.$disconnect();
});

test('Should support register success', async () => {
    await supertest(web)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            name: 'Sample',
            password: '@Secret123'
        })
        .expect(200);
});

test('Should support register username already exists', async () => {
    await supertest(web)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            name: 'Sample 1',
            password: '@Secret123'
        })
        .expect(200);

    const response = await supertest(web)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            name: 'Sample 2',
            password: '@Secret123'
        })
        .expect(400);

    expect(response.body.errors[0].username).toBe("The username field is already exists")
});

test('Should support register failed validation', async () => {
    const response = await supertest(web)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sa',
            name: 'Sa',
            password: 'Se'
        })
        .expect(400);
        
    expect(response.body.errors[0].password).toBe("Too small: expected string to have >=8 characters")
    expect(response.body.errors[1].name).toBe("Too small: expected string to have >=3 characters")
    expect(response.body.errors[2].username).toBe("Too small: expected string to have >=3 characters")
});

test('Should support login success', async () => {
    await supertest(web)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            name: 'Sample 1',
            password: '@Secret123'
        })
        .expect(200);

    const response = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    expect(response.body.data.username).toBe('Sample');
    expect(response.body.data.name).toBe('Sample 1');
    expect(response.body.data.token).toBeDefined();
})

test('Should support login failed', async () => {
    await supertest(web)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            name: 'Sample 1',
            password: '@Secret123'
        })
        .expect(200);

    const response = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: 'Salah123'
        })
        .expect(401);

    expect(response.body.errors).toBe('Username or Password is wrong');
})

test('Should support current success', async () => {
    await supertest(web)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            name: 'Sample 1',
            password: '@Secret123'
        })
        .expect(200);

    const response = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    const { body } = await supertest(web)
        .get('/api/users/current')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', response.body.data.token)
        .expect(200);

    expect(body.data.username).toBe('Sample');
    expect(body.data.name).toBe('Sample 1');
    expect(body.data.token).toBeUndefined();
})

test('Should support logout success', async () => {
    await supertest(web)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            name: 'Sample 1',
            password: '@Secret123'
        })
        .expect(200);

    const response = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    const { body } = await supertest(web)
        .delete('/api/users/logout')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', response.body.data.token)
        .expect(200);

    expect(body.data).toBe(true);

    const user = await prisma.user.findUnique({
        where: {
            username: response.body.data.username
        }
    })

    expect(user!.token).toBeNull();
})

test('Should support logout failed', async () => {
    const { body } = await supertest(web)
        .delete('/api/users/logout')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'salah')
        .expect(401);

    expect(body.errors).toBe('Unauthenticated');
})

test('Should support update success', async () => {
    await supertest(web)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            name: 'Sample 1',
            password: '@Secret123'
        })
        .expect(200);

    const response = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    const { body } = await supertest(web)
        .patch('/api/users/current')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', response.body.data.token)
        .send({
            name: 'Sample update'
        })
        .expect(200);

    expect(body.data.name).toBe('Sample update');
})

test('Should support update failed validation', async () => {
    await supertest(web)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            name: 'Sample 1',
            password: '@Secret123'
        })
        .expect(200);

    const response = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    const { body } = await supertest(web)
        .patch('/api/users/current')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', response.body.data.token)
        .send({
            name: ''
        })
        .expect(400);

    expect(body.errors[0].name).toBe('Too small: expected string to have >=3 characters');
})