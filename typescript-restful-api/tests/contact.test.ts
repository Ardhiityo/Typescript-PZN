import prisma from "../src/app/prisma";
import supertest from "supertest";
import web from "../src/app/web";

beforeAll(async () => {
    await prisma.$connect();
});

beforeEach(async () => {
    await prisma.contact.deleteMany({});
    await prisma.user.deleteMany({});
});

afterAll(async () => {
    await prisma.$disconnect();
});

test('Should support create success', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);


    const response = await supertest(web)
        .post('/api/contacts')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', body.data.token)
        .send({
            first_name: 'John',
            email: 'john@gmail.com',
            phone: '+62896500'
        })
        .expect(200);

    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe('John');
    expect(response.body.data.email).toBe('john@gmail.com');
    expect(response.body.data.phone).toBe('+62896500');
})

test('Should support create failed validation', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);


    const response = await supertest(web)
        .post('/api/contacts')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', body.data.token)
        .send({
            first_name: '',
            email: 'john@gmail.com',
            phone: '+62896500'
        })
        .expect(400);

    expect(response.body.errors[0].first_name)
        .toBe('Too small: expected string to have >=3 characters')
})

test('Should support search without filter success', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const response = await supertest(web)
        .get('/api/contacts')
        .set('Accept', 'application/json')
        .set('Authorization', body.data.token)
        .expect(200);

    expect(response.body.paging.page).toBe(1)
    expect(response.body.paging.total_page).toBe(4)
    expect(response.body.paging.total_item).toBe(35)
})

test('Should support search with filter page', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const response = await supertest(web)
        .get('/api/contacts')
        .query({
            page: 2
        })
        .set('Accept', 'application/json')
        .set('Authorization', body.data.token)
        .expect(200);

    expect(response.body.paging.page).toBe(2)
    expect(response.body.paging.total_page).toBe(4)
    expect(response.body.paging.total_item).toBe(35)
})

test('Should support search with filter name', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const response = await supertest(web)
        .get('/api/contacts')
        .query({
            name: 'John 34'
        })
        .set('Accept', 'application/json')
        .set('Authorization', body.data.token)
        .expect(200);

    expect(response.body.paging.page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.total_item).toBe(1)
    expect(response.body.data[0].first_name).toBe('John 34')
    expect(response.body.data[0].email).toBe('john34@gmail.com')
})

test('Should support search with filter email', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const response = await supertest(web)
        .get('/api/contacts')
        .query({
            email: 'john34@gmail.com'
        })
        .set('Accept', 'application/json')
        .set('Authorization', body.data.token)
        .expect(200);

    expect(response.body.paging.page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.total_item).toBe(1)
    expect(response.body.data[0].first_name).toBe('John 34')
    expect(response.body.data[0].email).toBe('john34@gmail.com')
})

test('Should support search with filter phone', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const response = await supertest(web)
        .get('/api/contacts')
        .query({
            phone: '+6289650034'
        })
        .set('Accept', 'application/json')
        .set('Authorization', body.data.token)
        .expect(200);

    expect(response.body.paging.page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.total_item).toBe(1)
    expect(response.body.data[0].first_name).toBe('John 34')
    expect(response.body.data[0].phone).toBe('+6289650034')
})

test('Should support find by contactId', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const contact = await prisma.contact.findFirst({
        where: {
            user_id: body.id
        }
    });

    const response = await supertest(web)
        .get(`/api/contacts/${contact!.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', body.data.token)
        .expect(200);

    expect(response.body.data.id).toBe(contact!.id);
    expect(response.body.data.first_name).toBe(contact!.first_name);
    expect(response.body.data.last_name).toBe(contact!.last_name);
    expect(response.body.data.email).toBe(contact!.email);
    expect(response.body.data.phone).toBe(contact!.phone);
})

test('Should support delete by contactId success', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const contact = await prisma.contact.findFirst({
        where: {
            user_id: body.id
        }
    });

    const response = await supertest(web)
        .delete(`/api/contacts/${contact!.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', body.data.token)
        .expect(200);

    expect(response.body.data).toBe(true);
})

test('Should support delete by contactId not found', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const response = await supertest(web)
        .delete(`/api/contacts/salah`)
        .set('Accept', 'application/json')
        .set('Authorization', body.data.token)
        .expect(404);

    expect(response.body.errors).toBe('Contact not found');
})

test('Should support update by contactId success', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const contact = await prisma.contact.findFirst({
        where: {
            user_id: body.id
        }
    });

    const response = await supertest(web)
        .put(`/api/contacts/${contact!.id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', body.data.token)
        .send({
            first_name: `John Update`,
            email: `johnupdate@gmail.com`,
            phone: `+62896500123`
        })
        .expect(200);

    expect(response.body.data.id).toBe(contact!.id);
    expect(response.body.data.first_name).toBe('John Update');
    expect(response.body.data.last_name).toBeNull();
    expect(response.body.data.email).toBe('johnupdate@gmail.com');
    expect(response.body.data.phone).toBe(`+62896500123`);
})

test('Should support update by contactId not found', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const contact = await prisma.contact.findFirst({
        where: {
            user_id: body.id
        }
    });

    const response = await supertest(web)
        .put(`/api/contacts/salah`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', body.data.token)
        .send({
            first_name: `John Update`,
            email: `johnupdate@gmail.com`,
            phone: `+62896500123`
        })
        .expect(404);

    expect(response.body.errors).toBe('Contact not found');
})

test('Should support update by contactId failed validation', async () => {
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

    const { body } = await supertest(web)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            username: 'Sample',
            password: '@Secret123'
        })
        .expect(200);

    for (let i = 0; i < 35; i++) {
        await supertest(web)
            .post('/api/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', body.data.token)
            .send({
                first_name: `John ${i}`,
                email: `john${i}@gmail.com`,
                phone: `+62896500${i}`
            })
            .expect(200);
    }

    const contact = await prisma.contact.findFirst({
        where: {
            user_id: body.id
        }
    });

    const response = await supertest(web)
        .put(`/api/contacts/${contact!.id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', body.data.token)
        .send({
            first_name: ``,
            email: `johnupdate@gmail.com`,
            phone: `+62896500123`
        })
        .expect(400);

    expect(response.body.errors[0].first_name).toBe('Too small: expected string to have >=3 characters')
})