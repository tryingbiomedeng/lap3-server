require("dotenv").config({path: './test/.env.test'})

//basic api imports
const request = require("supertest");
const server = require("../app");

// Controller imports 


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
    
    describe('Notes controllers tests', () => {


        test("should call the 'notesByUsername' controller for '/notes/user/:username'", async () => {

            const mockNotesByUsername = jest.spyOn(notesControllers,'notesByUsername').mockResolvedValueOnce(true)

            const response = await request(app).get("/user/:username")
            expect(mockNotesByUsername).toHaveBeenCalledTimes(1)
         })
        
    })
    
})
