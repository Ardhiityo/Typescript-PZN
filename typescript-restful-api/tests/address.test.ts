import prisma from "../src/app/prisma";
import supertest from "supertest";
import web from "../src/app/web";

describe('Address API', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    beforeEach(async () => {
        await prisma.address.deleteMany({});
        await prisma.contact.deleteMany({});
        await prisma.user.deleteMany({});

        await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                name: 'test',
                password: 'password'
            });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    async function getSetup() {
        const login = await supertest(web)
            .post('/api/users/login')
            .send({ username: 'test', password: 'password' });
        
        const token = login.body.data.token;

        const contact = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', token)
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
                phone: '+628123456789'
            });
        
        return { token, contactId: contact.body.data.id };
    }

    describe('POST /api/contacts/:contactId/addresses', () => {
        it('should be able to create address', async () => {
            const { token, contactId } = await getSetup();

            const response = await supertest(web)
                .post(`/api/contacts/${contactId}/addresses`)
                .set('Authorization', token)
                .send({
                    street: 'Jalan Test',
                    city: 'Jakarta',
                    province: 'DKI Jakarta',
                    country: 'Indonesia',
                    postal_code: '12345'
                });

            expect(response.status).toBe(200);
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.city).toBe('Jakarta');
        });

        it('should reject if request is invalid', async () => {
            const { token, contactId } = await getSetup();

            const response = await supertest(web)
                .post(`/api/contacts/${contactId}/addresses`)
                .set('Authorization', token)
                .send({
                    city: '',
                    province: 'DKI Jakarta',
                    country: 'Indonesia'
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        });
    });

    describe('GET /api/contacts/:contactId/addresses', () => {
        it('should be able to list addresses', async () => {
            const { token, contactId } = await getSetup();

            await supertest(web)
                .post(`/api/contacts/${contactId}/addresses`)
                .set('Authorization', token)
                .send({
                    city: 'Jakarta',
                    province: 'DKI Jakarta',
                    country: 'Indonesia'
                });

            const response = await supertest(web)
                .get(`/api/contacts/${contactId}/addresses`)
                .set('Authorization', token);

            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(1);
        });
    });

    describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
        it('should be able to get address detail', async () => {
            const { token, contactId } = await getSetup();

            const address = await supertest(web)
                .post(`/api/contacts/${contactId}/addresses`)
                .set('Authorization', token)
                .send({
                    city: 'Jakarta',
                    province: 'DKI Jakarta',
                    country: 'Indonesia'
                });

            const response = await supertest(web)
                .get(`/api/contacts/${contactId}/addresses/${address.body.data.id}`)
                .set('Authorization', token);

            expect(response.status).toBe(200);
            expect(response.body.data.city).toBe('Jakarta');
        });

        it('should return 404 if address not found', async () => {
            const { token, contactId } = await getSetup();

            const response = await supertest(web)
                .get(`/api/contacts/${contactId}/addresses/9999`)
                .set('Authorization', token);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
        it('should be able to update address', async () => {
            const { token, contactId } = await getSetup();

            const address = await supertest(web)
                .post(`/api/contacts/${contactId}/addresses`)
                .set('Authorization', token)
                .send({
                    city: 'Jakarta',
                    province: 'DKI Jakarta',
                    country: 'Indonesia'
                });

            const response = await supertest(web)
                .put(`/api/contacts/${contactId}/addresses/${address.body.data.id}`)
                .set('Authorization', token)
                .send({
                    city: 'Bandung',
                    province: 'Jawa Barat',
                    country: 'Indonesia'
                });

            expect(response.status).toBe(200);
            expect(response.body.data.city).toBe('Bandung');
        });
    });

    describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
        it('should be able to delete address', async () => {
            const { token, contactId } = await getSetup();

            const address = await supertest(web)
                .post(`/api/contacts/${contactId}/addresses`)
                .set('Authorization', token)
                .send({
                    city: 'Jakarta',
                    province: 'DKI Jakarta',
                    country: 'Indonesia'
                });

            const response = await supertest(web)
                .delete(`/api/contacts/${contactId}/addresses/${address.body.data.id}`)
                .set('Authorization', token);

            expect(response.status).toBe(200);
            
            const check = await supertest(web)
                .get(`/api/contacts/${contactId}/addresses/${address.body.data.id}`)
                .set('Authorization', token);
            expect(check.status).toBe(404);
        });
    });
});
