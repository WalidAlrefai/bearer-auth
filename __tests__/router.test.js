'use strict';

process.env.SECRET = "toes";

const supertest = require('supertest');
const server = require('../src/server.js').app;
const { db } = require('../src/auth/models/index.js');

const mockRequest = supertest(server);

let users = {
    admin: { id:0, username: 'admin', password: 'password' },
    editor: { id:1, username: 'editor', password: 'password' },
    user: { id:2,username: 'user', password: 'password' },
};

beforeAll(async () => {
    await db.sync();

});
afterAll(async () => {
    await db.drop();

});


describe('Auth Router', () => {
    console.log("111111");

    Object.keys(users).forEach(userType => {
        console.log("2222222");
        console.log("333",userType);

        describe(`${userType} users`, () => {
            console.log("user type",userType);
            it('can create one', async () => {
                const response = await mockRequest.post('/signup').send(users[userType]);
                // console.log("response",response);
                const userObject = response.body;
                // console.log('123',response.body);
                expect(response.status).toBe(201);
                // console.log("1181",response.status);
                // console.log("to...",userObject);
                expect(userObject.token).toBeDefined();
                expect(userObject.id).toBeDefined();
                expect(userObject.username).toEqual(users[userType].username)
            });
            it('can signin with basic', async () => {
                const response = await mockRequest.post('/signin')
                    .auth(users[userType].username, users[userType].password);
                const userObject = response.body;
                expect(response.status).toBe(200);
                console.log('11223',users[userType].username);
                console.log('11223',userObject.username);
                expect(userObject.token).toBeDefined();
                expect(userObject.id).toBeDefined();
                expect(userObject.username).toEqual(users[userType].username)
            });
            it('can signin with bearer', async () => {
                // First, use basic to login to get a token
                const response = await mockRequest.post('/signin')
                    .auth(users[userType].username, users[userType].password);
                const token = response.body.token;
                // First, use basic to login to get a token
                const bearerResponse = await mockRequest
                    .get('/secretstuff')
                    .set('Authorization', `Bearer ${token}`)
                // Not checking the value of the response, only that we "got in"
                expect(bearerResponse.status).toBe(200);
                
            });
        });
        describe('bad logins', () => {
            it('basic fails with known user and wrong password ', async () => {
                const response = await mockRequest.post('/signin')
                    .auth('admin', 'xyz')
                const userObject = response.body;
                expect(response.status).toBe(403);
                expect(userObject.user).not.toBeDefined();
                expect(userObject.token).not.toBeDefined();
            });
            it('basic fails with unknown user', async () => {
                const response = await mockRequest.post('/signin')
                    .auth('nobody', 'xyz')
                const userObject = response.body;
                console.log(typeof response.status)
                expect(response.status).toBe(403);
                expect(userObject.user).not.toBeDefined();
                expect(userObject.token).not.toBeDefined()
                
            });
            it('bearer fails with an invalid token', async () => {
                // First, use basic to login to get a token
                const bearerResponse = await mockRequest
                    .get('/secretstuff')
                    .set('Authorization', `Bearer foobar`)
                    // console.log(bearerResponse);
                // Not checking the value of the response, only that we "got in"
                expect(bearerResponse.status).toBe(403);
            })
        })
    });

});