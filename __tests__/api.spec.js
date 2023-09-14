require("dotenv").config({path: './test/.env.test'})
const Note = require("../Models/NotesModel")
const Token = require("../Models/TokenModel")

//basic api imports
const request = require("supertest");
const server = require("../app");

// TODO Middleware Imports
const authenticator = require("../middleware/authenticator")

jest.mock("../Models/TokenModel")
jest.mock("../Models/NotesModel")

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

    //low-server error handling checks
    describe("Catch All Error Handling", () => {

        test("should return a 405 status code for an out of range POST request", async () => {
            const response = await request(app).post("/invalid-endpoint");

            expect(response.statusCode).toBe(405)
            expect(response.body).toEqual({status: 405, message: "Method Not Allowed"})
        })

        test("should return a 405 status code for an out of range PUT request", async () => {
            const response = await request(app).put("/invalid-endpoint");

            expect(response.statusCode).toBe(405)
            expect(response.body).toEqual({status: 405, message: "Method Not Allowed"})
        })

        test("should return a 405 status code for an out of range GET request", async () => {
            const response = await request(app).get("/invalid-endpoint");
            
            expect(response.statusCode).toBe(405)
            expect(response.body).toEqual({status: 405, message: "Method Not Allowed"})
        })

        test("should return a 405 status code for an out of range DELETE request", async () => {
            const response = await request(app).delete("/invalid-endpoint");

            expect(response.statusCode).toBe(405)
            expect(response.body).toEqual({status: 405, message: "Method Not Allowed"})
        })
    })
})

describe('Authenticator middleware tests', () => {
    let next;
    let req;
    let res;

    beforeEach(() => {
        next = jest.fn();
        req = {
            headers: {
                authorization: "valid.token.here"
            }
        };
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    })
 
    afterEach(() => {
        jest.clearAllMocks();
    })

    it('Should pass to next() with a valid token', async () => {


        const tokenValidationMock = (req.headers.authorization)

        const findOne = jest.spyOn(Token, "findOne").mockResolvedValueOnce(tokenValidationMock)

        await authenticator(req, res, next);

        expect(next).toHaveBeenCalledWith()
        expect(findOne).toHaveBeenCalledWith({ "token": "valid.token.here" });
        expect(res.status).not.toHaveBeenCalled()
    }),

    it('Should return 401 when no token is provided in header', async () => {

        req = {
            headers: {
        
            }
        }; 

        const tokenValidationMock = (req.headers)

        const findOne = jest.spyOn(Token, "findOne").mockRejectedValueOnce(tokenValidationMock)

        await authenticator(req, res, next);

        expect(next).not.toHaveBeenCalled()
        expect(findOne).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith('Access denied. No token provided.')
    })


    it('Should return 403 when provided token is Invalid', async () => {

        req = {
            headers: {
                authorization: "invalid.token.here"
            }
        };  

        const invalidToken = (req.headers.authorization)

        const findOne = jest.spyOn(Token, "findOne").mockResolvedValueOnce(invalidToken)
 
        await authenticator(req, res, next);
  
        expect(next).not.toHaveBeenCalled()
        expect(findOne).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(403)
        expect(res.send).toHaveBeenCalledWith('Invalid token')
    })
});
