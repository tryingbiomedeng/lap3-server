require('dotenv').config({ path: './test/.env.test' })
const request = require('supertest')
const server = require('../../app')
const Planner = require('../../Models/PlannerModel')

describe("Controller tests", () => {
  let app 
  const samplePlanners = [
    {
      _id: '6500787545ec1cab08690bf8',
      username: 'Tester1',
      content: 'Test content 1',
      date: '2023-01-01',
      tag: 'test1',
    },
    {
      _id: '6500787545ec1cab08230bf8',
      username: 'Tester2',
      content: 'Test content 2',
      date: '2023-01-02',
      tag: 'test2',
    },
    {
      _id: '6500787545ec1cab08450bf8',
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
      const findSpy = jest.spyOn(Planner, 'find').mockResolvedValue(samplePlanners)
      const res = await request(app).get('/planners')
      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body)).toBeTruthy()
      expect(res.body.length).toEqual(samplePlanners.length)

      // findSpy.mockRestore()
    })
  })

  describe('GET /planners/:id', () => {
    it('should get a planner by Id', async () => {
      jest.setTimeout(15000);
      const findByIdSpy = jest.spyOn(Planner, 'findById').mockResolvedValue(samplePlanners[0])
      const planner = await Planner.create(samplePlanners[0])
      const res = await request(app).get(`/planners/${planner.id}`)
      expect(res.statusCode).toEqual(200)
      expect(res.body._id).toEqual(planner.id.toString())
      // findByIdSpy.mockRestore()
    },)
  
    it('should return 404 if planner not found by Id', async () => {
      const findByIdSpy = jest.spyOn(Planner, 'findById').mockResolvedValue(null)
      const res = await request(app).get('/planners/invalid-id')
      expect(res.statusCode).toEqual(404)
      // findByIdSpy.mockRestore()
    })
  }),

  describe('GET /planners/username/:username', () => {
    it('should get planners by username', async () => {
      const findSpy = jest.spyOn(Planner, 'find').mockResolvedValue(samplePlanners);
      await Planner.insertMany(samplePlanners)
      const username = samplePlanners[0].username;
      const res = await request(app).get(`/planners/user/${username}`)
      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body.user)).toBeTruthy()
      expect(res.body.success).toEqual(true)
      // findSpy.mockRestore()
    })

    it('should return 404 if no planners found by username', async () => {
      const findSpy = jest.spyOn(Planner, 'find').mockResolvedValue([])
      const username = 'nonexistentuser'
      const res = await request(app).get(`/planners/user/${username}`)

      expect(res.statusCode).toEqual(404)
      expect(res.body.success).toEqual(false)
      // findSpy.mockRestore()
    })
  }),
  
  describe('POST /planners', () => {
    it('should create a new planner', async () => {
      const createSpy = jest.spyOn(Planner, 'create').mockResolvedValue(samplePlanners[0])
      const res = await request(app).post('/planners').send(samplePlanners[0])
      expect(res.statusCode).toEqual(201)
      expect(res.body.respond.username).toEqual(samplePlanners[0].username)
      // createSpy.mockRestore()
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
      const findByIdAndUpdateSpy = jest.spyOn(Planner, 'findByIdAndUpdate').mockResolvedValue({
        _id: planner.id,
        content: updatedContent,
      })

      const res = await request(app)
        .patch(`/planners/${planner.id}`)
        .send({ content: updatedContent })

      expect(res.statusCode).toEqual(200)
      expect(res.body.response.content).toEqual(updatedContent)
      // findByIdAndUpdateSpy.mockRestore()
    })

    it('should return 404 if planner not found by Id', async () => {
      const findByIdAndUpdateSpy = jest.spyOn(Planner, 'findByIdAndUpdate').mockResolvedValue(null)
      const res = await request(app)
        .patch('/planners/invalid-id')
        .send({ content: 'Updated content' })
      expect(res.statusCode).toEqual(404)
      // findByIdAndUpdateSpy.mockRestore()
    })
  }),

  describe('DELETE /planners/:id', () => {
    it('should delete a planner by Id', async () => {
      // const delQuery = jest.spyOn(Planner, pla)
      const findByIdAndDeleteSpy = jest.spyOn(Planner, 'findByIdAndDelete').mockResolvedValue({success: true})

      const planner = await Planner.create(samplePlanners[0])
      

      const res = await request(app).delete(`/planners/${planner.id}`)
      expect(res.statusCode).toEqual(204)
      // findByIdAndDeleteSpy.mockRestore()
    })

    it('should return 404 if planner not found by Id', async () => {
      const findByIdAndDeleteSpy = jest.spyOn(Planner, 'findByIdAndDelete').mockResolvedValue(null)
      const res = await request(app).delete('/planners/invalid-id')
      expect(res.statusCode).toEqual(404)
      // findByIdAndDeleteSpy.mockRestore()
    })
  })
})
