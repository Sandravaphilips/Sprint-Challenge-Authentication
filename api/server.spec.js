const request = require('supertest');

const server = require('./server');

jest.setTimeout(30000);

describe('server tests', () => {
    it('the db env is testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('new user is added', () => {
        it('status code 201 is returned', async()=> {
            const response = await request(server).post('/api/auth/register').send({username: "Sarim", password: "12345"});

            expect(response.status).toBe(201);
        })

        it('expects a json content', () => {
            return request(server).post('/api/auth/register')
                .send({username: 'Sandra', password: '12345'})
                .expect('Content-Type', /json/)
        })
        
    });

    describe('user is logged in', () => {
        it('status code 200 is returned', async()=> {
            await request(server).post('/api/auth/register').send({username: "karim", password: "12345"});

            const response = await request(server).post('/api/auth/login').send({username: 'karim', password: '12345'})

            expect(response.status).toBe(200);
        })

        it('expects a json content', async() => {
            await request(server).post('/api/auth/register').send({username: "karim", password: "12345"});

            return request(server).post('/api/auth/login')
                .send({username: 'karim', password: '12345'})
                .expect('Content-Type', /json/)
        })
        
    });    

    describe('jokes can\'t be accessed without authorization', () => {
        it('status code 400 is returned', async()=> {

            const response = await request(server).get('/api/jokes')

            expect(response.status).toBe(400);
        })

        it('expects an error message', async() => {

            return request(server).get('/api/jokes')
                .expect('Content-Type', /json/)
                .expect({message: "You're not authorized to view this page. Please login and continue"})
        })
        
    });  

    
})