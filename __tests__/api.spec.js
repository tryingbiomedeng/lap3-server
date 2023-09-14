require("dotenv").config({path: './test/.env.test'})
const Note = require("../Models/NotesModel")
const Token = require("../Models/TokenModel")

//basic api imports
const request = require("supertest");
const server = require("../app");


// TODO: Auth Imports

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

describe('authenticator middleware tests', () => {
    let next;
    let req;
    let res;

    beforeEach(() => {
        next = jest.fn();
        req = {
            headers: {
                authorization: "valid.token.here"
            },
        }; 
        
    });
 
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should pass with a valid token', async () => {
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const tokenValidationMock = (req.headers.authorization)

        const findOne = jest.spyOn(Token, "findOne").mockResolvedValueOnce(tokenValidationMock)

        await authenticator(req, res, next);

        expect(next).toHaveBeenCalledWith()
        expect(findOne).toHaveBeenCalledWith({ "token": "valid.token.here" });
        expect(res.status).not.toHaveBeenCalled()
        // expect(validTokenMock.isExpired).toHaveBeenCalled();
        // expect(User.getByUsername).toHaveBeenCalledWith('testUser');
        // expect(userMock.isActivated).toHaveBeenCalled();
        // expect(res.locals.token).toBe('validTokenHere');
        // expect(res.locals.user).toBe('testUser');
        // expect(next).toHaveBeenCalled();
        // expect(res.redirect).not.toHaveBeenCalled();
    });

    // it('should redirect to "/" if token is empty', async () => {
    //     req.headers.cookie = 'token=';

    //     await authenticator(req, res, next);

    //     expect(Token.getOneByToken).not.toHaveBeenCalled();
    //     expect(res.redirect).toHaveBeenCalledWith('/');
    //     expect(next).not.toHaveBeenCalled();
    // });

    // it('should redirect to "/" if an error occurs in token retrieval', async () => {
    //     Token.getOneByToken.mockRejectedValue(new Error('Mocked token error'));

    //     await authenticator(req, res, next);

    //     expect(Token.getOneByToken).toHaveBeenCalledWith('validTokenHere');
    //     expect(res.redirect).toHaveBeenCalledWith('/');
    //     expect(next).not.toHaveBeenCalled();
    // });

    // it('should redirect to "/" if an error occurs in user retrieval', async () => {
    //     // Mock valid token, but throw an error when retrieving the user
    //     const validTokenMock = {
    //         account_username: 'testUser',
    //         isExpired: jest.fn().mockResolvedValue(false),
    //     };

    //     Token.getOneByToken.mockResolvedValue(validTokenMock);
    //     User.getByUsername.mockRejectedValue(new Error('Mocked user error'));

    //     await authenticator(req, res, next);

    //     expect(Token.getOneByToken).toHaveBeenCalledWith('validTokenHere');
    //     expect(User.getByUsername).toHaveBeenCalledWith('testUser');
    //     expect(res.redirect).toHaveBeenCalledWith('/');
    //     expect(next).not.toHaveBeenCalled();
    // });

    // it('should redirect to "/" if user is not activated', async () => {
    //     const validTokenMock = {
    //         account_username: 'testUser',
    //         isExpired: jest.fn().mockResolvedValue(false),
    //     };

    //     const userMock = {
    //         isActivated: jest.fn().mockResolvedValue(false), // User is not activated
    //     };

    //     Token.getOneByToken.mockResolvedValue(validTokenMock);
    //     User.getByUsername.mockResolvedValue(userMock);

    //     await authenticator(req, res, next);

    //     expect(Token.getOneByToken).toHaveBeenCalledWith('validTokenHere');
    //     expect(validTokenMock.isExpired).not.toHaveBeenCalled();
    //     expect(User.getByUsername).toHaveBeenCalledWith('testUser');
    //     expect(userMock.isActivated).toHaveBeenCalled();
    //     expect(res.redirect).toHaveBeenCalledWith('/');
    //     expect(next).not.toHaveBeenCalled();
    // });

    // it('should redirect to "/" if token is expired', async () => {
    //     const validTokenMock = {
    //         account_username: 'testUser',
    //         isExpired: jest.fn().mockResolvedValue(true), // Token is expired
    //     };

    //     const mocked = {
    //         isActivated: jest.fn().mockResolvedValue(true), // User is activated
    //     };

    //     Token.getOneByToken.mockResolvedValue(validTokenMock);
    //     User.getByUsername.mockResolvedValue(mocked);

    //     await authenticator(req, res, next);

    //     expect(Token.getOneByToken).toHaveBeenCalledWith('validTokenHere');
    //     expect(validTokenMock.isExpired).toHaveBeenCalled();
    //     expect(User.getByUsername).toHaveBeenCalledWith('testUser');
    //     expect(mocked.isActivated).toHaveBeenCalled();
    //     expect(res.redirect).toHaveBeenCalledWith('/');
    //     expect(next).not.toHaveBeenCalled();
    // });
});
