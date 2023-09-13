require('dotenv').config({ path: './test/.env.test' })
const request = require('supertest')
const server = require('../../app')
const Planner = require('../../Models/PlannerModel')

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe("Controller tests", () => {
  let app 
  const samplePlanners = [
    {
      username: 'Tester1',
      content: 'Test content 1',
      date: '2023-01-01',
      tag: 'test1',
    },
    {
      username: 'Tester2',
      content: 'Test content 2',
      date: '2023-01-02',
      tag: 'test2',
    },
    {
      username: 'Tester3',
      content: 'Test content 3',
      date: '2023-01-03',
      tag: 'test3',
    } 
  ]
  beforeAll(() => {
      app = server.listen(process.env.TEST_PORT)
  })
  afterAll(() => {
      jest.clearAllMocks()
      app.close()
  })
  afterEach(() => {
      jest.clearAllMocks()
  })

  describe('GET /planners', () => {
    it('should get all planners', async () => {
      await Planner.insertMany(samplePlanners)
      await delay(10000)
      const res = await request(app).get('/planners')
      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body)).toBeTruthy()
      expect(res.body.length).toEqual(samplePlanners.length)
    })
  }),

  describe('GET /planners/:id', () => {
    it('should get a planner by Id', async () => {
      const planner = await Planner.create(samplePlanners[0])
      const res = await request(app).get(`/planners/${planner.id}`)
      expect(res.statusCode).toEqual(200)
      expect(res.body._id).toEqual(planner.id.toString())
    })

    it('should return 404 if planner not found by Id', async () => {
      const res = await request(app).get('/planners/invalid-id')
      expect(res.statusCode).toEqual(404)
    })
  }),

  describe('GET /planners/username/:username', () => {
    it('should get planners by username', async () => {
      await Planner.insertMany(samplePlanners)
      const username = samplePlanners[0].username
      const res = await request(app).get(`/planners/username/${username}`)
      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body.user)).toBeTruthy()
      expect(res.body.success).toEqual(true)
    })

    it('should return 404 if no planners found by username', async () => {
      const username = 'nonexistentuser'
      const res = await request(app).get(`/planners/username/${username}`)
      expect(res.statusCode).toEqual(404)
      expect(res.body.success).toEqual(false)
    })
  }),
  
  describe('POST /planners', () => {
    it('should create a new planner', async () => {
      const res = await request(app).post('/planners').send(samplePlanners[0])
      expect(res.statusCode).toEqual(201)
      expect(res.body.respond.username).toEqual(samplePlanners[0].username)
    })

    it('should return 400 if missing required fields in the request body', async () => {
      const res = await request(app).post('/planners').send({})
      expect(res.statusCode).toEqual(400)
    })
  }),

  describe('PATCH /planners/:id', () => {
    it('should update a planner by Id', async () => {
      const planner = await Planner.create(samplePlanners[0])
      const updatedContent = 'Updated content'
      const res = await request(app)
        .patch(`/planners/${planner.id}`)
        .send({ content: updatedContent })
      expect(res.statusCode).toEqual(200)
      expect(res.body.response.content).toEqual(updatedContent)
    })

    it('should return 404 if planner not found by Id', async () => {
      const res = await request(app)
        .patch('/planners/invalid-id')
        .send({ content: 'Updated content' })
      expect(res.statusCode).toEqual(404)
    })
  }),

  describe('DELETE /planners/:id', () => {
    it('should delete a planner by Id', async () => {
      const planner = await Planner.create(samplePlanners[0])
      const res = await request(app).delete(`/planners/${planner.id}`)
      expect(res.statusCode).toEqual(204)
    })

    it('should return 404 if planner not found by Id', async () => {
      const res = await request(app).delete('/planners/invalid-id')
      expect(res.statusCode).toEqual(404)
    })
  })
})

