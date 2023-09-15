require("dotenv").config({path: './test/.env.test'})
const mongoose = require("mongoose")
const notesController = require("../../controllers/notesControllers")
const Note = require("../../Models/NotesModel")
const Token = require("../../Models/TokenModel")
const authenticator = require("../../middleware/authenticator")

//basic api imports
const request = require("supertest");
const server = require("../../app");

jest.mock("../../Models/TokenModel")
jest.mock("../../Models/NotesModel")
jest.mock("../../middleware/authenticator", () => jest.fn((req,res,next) => next()))

describe("Controllers tests", () => {
    let app;
    let req;
    let res;
    let next;
 
    const sampleData = [
        {
            noIdDates1: {
                username: 'user3',
                title: 'PE Training Type',
                subject: 'Science',
                topic_tags: [ 'training' ],
                content: 'yes, PE still needs notes'
            },
            full1: {
                _id: "ObjectId('6500787545ec1cab08690bf8')",
                username: 'user3',
                title: 'PE Training Type',
                subject: 'Science',
                topic_tags: [ 'training' ],
                content: 'yes, PE still needs notes',
                createdAt: "2023-09-12T14:40:08.461Z",
                updatedAt: "2023-09-12T14:40:08.461Z",
                __v: 0
            },
            full2: {
                "_id": "6500785845ec1cab08690bf4",
                "username": "user3",
                "title": "PE Training Type",
                "subject": "Science",
                "topic_tags": ['training'],
                "content": "'yes, PE still needs notes'",
                "createdAt": "2023-09-12T14:40:08.461Z",
                "updatedAt": "2023-09-12T14:40:08.461Z",
                "__v": 0
            },
            noDC: {
                _id: '6500787545ec1cab08690bf8',
                username: 'user3',
                title: 'PE Training Type',
                subject: 'Science',
                topic_tags: [ 'training' ],
                content: 'yes, PE still needs notes',

            }
        },
        {
            token1: "eyJhbGciOiJIUzI1N.eyJfaWQiOiI2NT3MDYwODV9.YMcjcoEF1Eydpt4lw"
        } 
    ]

    beforeAll(() => {
        app = server.listen(process.env.TEST_PORT);
    });

    afterAll(() => {
        jest.clearAllMocks();
        app.close();
    });

    beforeEach(() => {
        req = {
            headers: {},
            body: {}
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("GET /notes/user/:username TESTS",() => {
        
        
        test("Should return trigger the Note.find() within the notesControllers.js", async () => {


            const findQuery = jest.spyOn(Note, 'find')
                .mockResolvedValueOnce(sampleData[0].full2)

            const response = await request(app).get(`/notes/user/${sampleData[0].full2.username}`)
                .set({'Accept': 'application/json', 'Authorization': 'tokenValue' })

            expect(findQuery).toHaveBeenCalledTimes(1);
        })

        test("Should return Status 200 and correct response for sucessful requests", async () => {

            const findQuery = jest.spyOn(Note, 'find')
                .mockResolvedValueOnce(sampleData[0].full2)

            const response = await request(app).get(`/notes/user/${sampleData[0].full2.username}`)
                .set({'Accept': 'application/json', 'Authorization': 'tokenValue' })

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({success: true, response: sampleData[0].full2})
        })

        test("Should return Status 404 and correct response for unsuccessful requests", async () => {

            const findQuery = jest.spyOn(Note, 'find')
                .mockRejectedValueOnce("error")

            const response = await request(app).get(`/notes/user/${sampleData[0].full2.username}`)
                .set({'Accept': 'application/json', 'Authorization': 'tokenValue' })

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({success: false, message: "Notes for user not found", "error": "error"})
        })
    }),

    describe("POST /notes/title TESTS",() => {
        
        test("Should return trigger the Note.find() within the notesControllers.js", async () => {

            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)
            const noteFindQuery = jest.spyOn(Note, 'find')
                .mockResolvedValueOnce(sampleData[0].full2)

            const response = await request(app).post(`/notes/title`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({title: sampleData[0].full2.title})

            expect(usernameFindQuery).toHaveBeenCalledTimes(1)
            expect(noteFindQuery).toHaveBeenCalledTimes(1);
        })

        test("Should return Status 200 and correct response for sucessful requests", async () => {

            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)

            const findQuery = jest.spyOn(Note, 'find').mockResolvedValueOnce(sampleData[0].full2)

            const response = await request(app).post(`/notes/title`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({title: sampleData[0].full2.title})

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({success: true, response: sampleData[0].full2})
        })

        test("Should return Status 404 and correct response for unsuccessful requests", async () => {

            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)

            const findQuery = jest.spyOn(Note, 'find')
                .mockRejectedValueOnce("error")

            const response = await request(app).post(`/notes/title`)
                .set({'Accept': 'application/json', 'Authorization': 'tokenValue' })

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({success: false, message: "Note not found", "error": "error"})
        })

    }),

    describe("GET /notes/tag/:tag test", () => {

        test("Should return trigger the Note.find() within the notesControllers.js", async () => { 

            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)

            const findQuery = jest.spyOn(Note, 'find')
                .mockResolvedValueOnce(sampleData[0].full2)

            const response = await request(app).get(`/notes/tag/${sampleData[0].full2.topic_tags}`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
            expect(usernameFindQuery).toHaveBeenCalledTimes(1)
            expect(findQuery).toHaveBeenCalledTimes(1);
            
        }),

        test("Should return Status 200 and correct response for sucessful requests", async () => {

            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)
            const findQuery = jest.spyOn(Note, 'find').mockResolvedValueOnce(sampleData[0].full2)

            const response = await request(app).get(`/notes/tag/${sampleData[0].full2.topic_tags}`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({success: true, response: sampleData[0].full2})
        }),

        test("Should return Status 404 and correct response for unsuccessful requests", async () => {

            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)
            const findQuery = jest.spyOn(Note, 'find').mockRejectedValueOnce("error")

            const response = await request(app).get(`/notes/tag/${sampleData[0].full2.topic_tags}`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })

            expect(findQuery).toHaveBeenCalledTimes(1)
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({success: false, message: "Note not found", "error": "error"})
        })
    })

    describe('POST /notes TESTS', () => { 
        let newNote = new Note();

        test("Should trigger Token.find() within the notesControllers.js", async () => { 

            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)
            
            const noteInstance = jest.spyOn(newNote, "save").mockResolvedValueOnce(sampleData[0].full2)

            const response = await request(app).post(`/notes`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({body: sampleData[0].full2})

            expect(usernameFindQuery).toHaveBeenCalledTimes(1)     
        }),

        test("Should trigger a new instance of Note within the notesControllers.js", async () => { 

            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)
            let newNote = new Note();
            const noteInstance = jest.spyOn(newNote, "save").mockResolvedValueOnce(sampleData[0].full2)

            const response = await request(app).post(`/notes`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({body: sampleData[0].full2})
 
            expect(noteInstance).toHaveBeenCalledTimes(1);
        }),

        test("Should return Status 201 and correct response for sucessful requests", async () => {
            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)
            
            const noteInstance = jest.spyOn(newNote, "save").mockResolvedValueOnce(sampleData[0].full2)
            const response = await request(app).post(`/notes`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({body: sampleData[0].noIdDates1}) 

            expect(response.status).toBe(201);
            expect(response.body).toEqual({success: true, response: sampleData[0].full2})
        }),

        test("Should return Status 404 and correct response for unsuccessful requests", async () => {

            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)
            const noteInstanceSave = jest.spyOn(newNote, "save").mockRejectedValueOnce("undefined")
            const response = await request(app).post(`/notes`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({body: sampleData[0].noIdDates1})
            
            expect(noteInstanceSave).toHaveBeenCalledTimes(1)
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({success: false, message: "Unable to create new note", "error": "undefined"})
        })

        test("Should return Status 404 and correct response for invalid note", async () => {
            const usernameFindQuery = jest.spyOn(Token, "find").mockResolvedValueOnce(sampleData[0].full2.username)
            const noteInstanceSave = jest.spyOn(newNote, "save").mockRejectedValueOnce("undefined")
            const response = await request(app).post(`/notes`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({body: sampleData[0].noIdDates1})

            expect(noteInstanceSave).toHaveBeenCalledTimes(1)
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({success: false, message: "Unable to create new note", error: "undefined"})
        })
    }),

    describe('PATCH /notes/:id TESTS', () => { 

        test("Should return trigger the Note.findByIdAndUpdate() within the notesControllers.js", async () => { 

            const findQuery = jest.spyOn(Note, 'findByIdAndUpdate')
                .mockResolvedValueOnce(sampleData[0].full1)

            const response = await request(app).patch(`/notes/${sampleData[0].noDC._id}`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({body: sampleData[0].noDC})

            expect(findQuery).toHaveBeenCalledTimes(1);        
        }),

        test("Should return Status 200 and correct response for sucessful requests", async () => {

            const findQuery = jest.spyOn(Note, 'findByIdAndUpdate')
                .mockResolvedValueOnce(sampleData[0].full1)

            const response = await request(app).patch(`/notes/${sampleData[0].noDC._id}`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({body: sampleData[0].noDC})

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({success: true, response: sampleData[0].full1})
        }),

        test("Should return Status 404 and correct response for unsuccessful requests", async () => {

            const findQuery = jest.spyOn(Note, 'findByIdAndUpdate')
                .mockRejectedValueOnce("error")

            const response = await request(app).patch(`/notes/${sampleData[0].noDC._id}`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({body: sampleData[0].noDC})

            expect(findQuery).toHaveBeenCalledTimes(1)
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({success: false, message: "Unable to update note", "error": "error"})
        })
    }),

    describe('DELETE /notes/:id TESTS', () => { 

        test("Should return trigger the Note.findByIdAndDelete() within the notesControllers.js", async () => { 

            const findQuery = jest.spyOn(Note, 'findByIdAndDelete')
                .mockResolvedValueOnce(sampleData[0].full1)

            const response = await request(app).delete(`/notes/${sampleData[0].noDC._id}`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })

            expect(findQuery).toHaveBeenCalledTimes(1);         
        }),

        test("Should return Status 204 and correct response for sucessful requests", async () => {

            const findQuery = jest.spyOn(Note, 'findByIdAndDelete')
                .mockResolvedValueOnce(sampleData[0].full1)

            const response = await request(app).delete(`/notes/${sampleData[0].noDC._id}`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({body: sampleData[0].noDC})

            expect(response.statusCode).toBe(204);
        }),

        test("Should return Status 404 and correct response for unsuccessful requests", async () => {

            const findQuery = jest.spyOn(Note, 'findByIdAndDelete')
                .mockResolvedValueOnce(undefined)

            const response = await request(app).delete(`/notes/${sampleData[0].noDC._id}`)
                .set({'Accept': 'application/json', 'Authorization': sampleData[1].token1 })
                .send({body: sampleData[0].noDC})

            expect(findQuery).toHaveBeenCalledTimes(1)
            expect(response.statusCode).toBe(404);
        })
    })
})
