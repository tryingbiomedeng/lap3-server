require("dotenv").config({path: './test/.env.test'})

//basic api imports
const request = require("supertest");
const server = require("../app");

// TODO: Auth Imports

// TODO Middleware Imports

// TODO Security Imports

describe("API tests", () => {
    let app;

    beforeAll(() => {
        app = server.listen(process.env.TEST_PORT);
    });

    afterAll(() => {
        jest.clearAllMocks();
        app.close();
    });

    it("should return a 200 status code for GET request to /", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200)
    }) 
})
