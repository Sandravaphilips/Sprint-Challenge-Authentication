const request = require('supertest');

const server = require('./server');

jest.setTimeout(30000);

describe('server tests', () => {
    it('the db env is testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    it('status code of 201 is returned when adding new user', () => {
        return request(server).post('/api/auth/register')
            .send({username: 'Sandra', password: '12345'})
            .expect(201)
            .expect('Content-Type', /json/)
    });

    it('user is logged in when the correct details are entered', async () => {
        await request(server).post('/api/auth/register').send({username: 'Karim', password: '12345'});

        return request(server).post('/api/auth/login').send({username: 'Karim', password: '12345'})
            .expect(200)
            .expect('Content-Type', /json/);
    })

    

    it('an error is thrown when the user is not authed', async () => {
        await request(server).post('/api/auth/register').send({username: 'Karim', password: '12345'});

        await request(server).post('/api/auth/login').send({username: 'Karim', password: '12345'});

        return request(server).get('/api/jokes')
            .expect(404)
            .expect({message: "You're not authorized to view this page. Please login and continue"});
    })
})