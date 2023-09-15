require("dotenv").config({path: './test/.env.test'})
const mongoose = require("mongoose")
const authController = require("../../controllers/authController")

const User = require("../../Models/User")
const Token = require("../../Models/TokenModel")
const authenticator = require("../../middleware/authenticator")

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

//basic api imports
const request = require("supertest");
const server = require("../../app");
// jest.mock("../../Models/TokenModel")
jest.mock("../../Models/User")
jest.mock("../../middleware/authenticator", () => jest.fn((req,res,next) => next()))

describe("AuthController Tests", () => {
    let app;
    let req;
    let res;
    let next;

    const sampleData = {
        user1: {
            username: "user1",
            password: "password1",
            _id: "idstring"
        },
        token: "eyJhbGciOiJIUzI1N.eyJfaWQiOiI2NT3MDYwODV9.YMcjcoEF1Eydpt4lw",
        tokenFull : {
            username: "user1",
            token: "eyJhbGciOiJIUzI1N.eyJfaWQiOiI2NT3MDYwODV9.YMcjcoEF1Eydpt4lw"
        }
    }

    beforeAll(() => {
        app = server.listen(process.env.TEST_PORT);
    });

    afterAll(() => {
        jest.clearAllMocks();
        app.close();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    beforeEach(() => {
        req = {
            headers: {},
            body: {}
        }
    })

    describe("GET /auth/find Tests", () => {

        test('Should return status 200 if Token.find() is successful', async () => {
            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData.user1.username)

            const response = await request(app).get(`/auth/find`)
                .set({Accept: 'application/json', Authorization: sampleData.token });
            

            expect(usernameFindQuery).toHaveBeenCalledTimes(1)
            expect(response.status).toBe(200)
        }),

        test('Should return status 404 if Token.find() is successful', async () => {
            const usernameFindQuery = jest.spyOn(Token, "find").mockRejectedValueOnce(sampleData.user1.username)

            const response = await request(app).get(`/auth/find`)
                .set({Accept: 'application/json', Authorization: sampleData.token });
            

            expect(usernameFindQuery).toHaveBeenCalledTimes(1)
            expect(response.status).toBe(404);
        })
    }),

    describe("POST /auth/register", () => {

        test("Should return 201 for correct schema data and successful save to database", async () => {
            
            let user = new User({username: sampleData.user1.username, password: sampleData.user1.password});
            const userInstance = jest.spyOn(user, "save").mockResolvedValueOnce(user)
 
            const response = await request(app).post(`/auth/register`)
                .set({'Accept': 'application/json', 'Authorization': sampleData.token })
                .send({username: sampleData.user1.username, password: sampleData.user1.password})

            expect(userInstance).toHaveBeenCalledTimes(1)
            expect(user).toBeInstanceOf(User)
            expect(response.status).toBe(201)
        }),

        test("Should return 201 for correct schema data and successful save to database", async () => {
            
            let user = new User({username: sampleData.user1.username, password: sampleData.user1.password});
            const userInstance = jest.spyOn(user, "save").mockRejectedValueOnce(user)
 
            const response = await request(app).post(`/auth/register`)
                .set({'Accept': 'application/json', 'Authorization': sampleData.token })
                .send({username: sampleData.user1.username, password: sampleData.user1.password})

            expect(userInstance).toHaveBeenCalledTimes(1)
            expect(user).toBeInstanceOf(User)
            expect(response.status).toBe(400)
        })
    }),

    describe("POST /auth/logout", () => {

        test("Should return 200 if user was logged in and token deletion was successful", async () => {

            const tokenFind = jest.spyOn(Token, "findOneAndDelete").mockResolvedValue({deletedCount: 1})
 
            const response = await request(app).post(`/auth/logout`)
                .set({'Accept': 'application/json', 'Authorization': sampleData.token })

            expect(tokenFind).toHaveBeenCalledTimes(1)
            expect(loggedOutUser).toHaveBeenCalledTimes(1)
            expect(response.status).toBe(200)
        })
    })
});
