require("dotenv").config({path: './test/.env.test'})
const mongoose = require("mongoose")
const authController = require("../../controllers/authController")

const User = require("../../Models/User")
const Token = require("../../Models/TokenModel")
const authenticator = require("../../middleware/authenticator")

//basic api imports
const request = require("supertest");
const server = require("../../app");
jest.mock("../../Models/TokenModel")
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
        token: "eyJhbGciOiJIUzI1N.eyJfaWQiOiI2NT3MDYwODV9.YMcjcoEF1Eydpt4lw"
    }

    beforeAll(() => {
        app = server.listen(process.env.TEST_PORT);
    });

    afterAll(() => {
        jest.clearAllMocks();
        app.close();
    });

    describe("GET /auth/find Tests", () => {

        test('Should return status 200 if Token.find() is successful', async () => {
            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData.user1.username)

            const response = await request(app).post(`/notes/title`)
                .set({'Accept': 'application/json', 'Authorization': sampleData.token })
            
            
            expect(usernameFindQuery).toHaveBeenCalledTimes(1)
            expect(response.status).toBe(200)
            expect(response).toEqual({"success": true, "response": {username: sampleData.user1.username}})
        }),
        
        test('Should throw new Error if username is not found from database', async () => {

            const usernameFindQuery = jest.spyOn(Token, "find").mockRejectedValueOnce(sampleData.user1.username)
            
            const response = await request(app).post(`/notes/title`)
                .set({'Accept': 'application/json', 'Authorization': sampleData.token })
            
            expect(response.status).toBe(404)
        })
    })
})
