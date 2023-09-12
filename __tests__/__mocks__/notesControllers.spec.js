require("dotenv").config({path: './test/.env.test'})
const notesController = require("../../controllers/notesControllers")

const Note = require("../../Models/NotesModel")


//basic api imports
const request = require("supertest");
const server = require("../../app");

describe("Controllers tests", () => {
    let app 

    const sampleData = [
        {
            noIdDates1: {
                username: 'user3',
                title: 'PE Training Type',
                subject: 'Sciene',
                topic_tags: [ 'training' ],
                content: 'yes, PE still needs notes'
            },
            full1: {
                _id: "ObjectId('6500787545ec1cab08690bf8')",
                username: 'user3',
                title: 'PE Training Type',
                subject: 'Sciene',
                topic_tags: [ 'training' ],
                content: 'yes, PE still needs notes',
                date_created: "2023-09-12T14:40:08.461Z",
                last_update: Date.now(),
                __v: 0
            },
            full2: {
                "_id": "6500785845ec1cab08690bf4",
                "username": "username1",
                "title": "Title1",
                "subject": "Subject1",
                "topic_tags": ["tag1"],
                "content": "content1",
                "date_created": "2023-09-12T14:40:08.461Z",
                "last_update": "2023-09-12T14:40:08.461Z",
                "__v": 0
            }
        }
    ]

    beforeAll(() => {
        app = server.listen(process.env.TEST_PORT);
    });

    afterAll(() => {
        jest.clearAllMocks();
        app.close();
    });

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("GET /notes/user/:username TESTS",() => {
        
        test("Should return trigger the Note.find() within the notesControllers.js", async () => {


            const findQuery = jest.spyOn(Note, 'find')
                .mockResolvedValueOnce(sampleData[0].full)

            const response = await request(app).get("/notes/user/username1")
                .set({'Accept': 'application/json', 'Authorization': 'tokenValue' }) //headers
                // .send() //body

            expect(findQuery).toHaveBeenCalledTimes(1);


        })

        test("Should return Status 200 and correct response for sucessful requests", async () => {

            const findQuery = jest.spyOn(Note, 'find')
                .mockResolvedValueOnce(sampleData[0].full2)

            const response = await request(app).get("/notes/user/username1")
                .set({'Accept': 'application/json', 'Authorization': 'tokenValue' }) //headers
                // .send() //body

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({success: true, response: sampleData[0].full2})

        })

    })

    
})
