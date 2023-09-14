require('dotenv').config({ path: './test/.env.test' })
const request = require('supertest')
const server = require('../../app')
const controller = require('../../controllers/plannerControllers')
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
      findSpy.mockRestore()
    })
    
    it('handles errors', async () => {
      const findSpy = jest.spyOn(Planner, 'find').mockRejectedValueOnce(new Error('Database error'))
      const res = await request(app).get('/planners')
      expect(res.statusCode).toBe(500)
      expect(res.body).toEqual({ success: false, 
        message: 'Database error',
        error: expect.any(Object) })
      findSpy.mockRestore()
    })
  })

  describe('GET /planners/:id', () => {
    it('should get a planner by Id', async () => {
      const findByIdSpy = jest.spyOn(Planner, 'findById').mockResolvedValue(samplePlanners[0])
      const createSpy = jest.spyOn(Planner, 'create').mockResolvedValue(samplePlanners[0])
      const res = await request(app).get(`/planners/${samplePlanners[0]._id}`)
      expect(res.statusCode).toEqual(200)
      createSpy.mockRestore()
      findByIdSpy.mockRestore()
      })
  
    it('should return 404 if planner not found by Id', async () => {
      const findByIdSpy = jest.spyOn(Planner, 'findById').mockResolvedValue(null)
      const res = await request(app).get('/planners/invalid-id')
      expect(res.statusCode).toEqual(404)
      findByIdSpy.mockRestore()
    })
    
    it('handles errors', async () => {
      const findSpy = jest.spyOn(Planner, 'findById').mockRejectedValueOnce(new Error('Id is required'))
      const res = await request(app).get('/planners/invalid-id')
      expect(res.statusCode).toBe(500)
      expect(res.body).toEqual({ success: false, 
        message: 'Id is required',
        error: expect.any(Object) })
      findSpy.mockRestore()
    })
  }),

  describe('GET /planners/user/:username', () => {
    it('should get planners by username', async () => {
      const findSpy = jest.spyOn(Planner, 'find').mockResolvedValue(samplePlanners)
      jest.spyOn(Planner, 'insertMany').mockResolvedValue()
      const username = samplePlanners[0].username
      const res = await request(app).get(`/planners/user/${username}`)
      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body.user)).toBeTruthy()
      expect(res.body.success).toEqual(true)
      findSpy.mockRestore()
    })

    it('should return 404 if no planners found by username', async () => {
      const findSpy = jest.spyOn(Planner, 'find').mockResolvedValue([])
      const username = 'nonexistentuser'
      const res = await request(app).get(`/planners/user/${username}`)
      expect(res.statusCode).toEqual(404)
      expect(res.body.success).toEqual(false)
      findSpy.mockRestore()
    })

    it('handles errors', async () => {
      const findSpy = jest.spyOn(Planner, 'find').mockRejectedValueOnce(new Error('Internal server error'))
      const username = 'nonexistentuser'
      const res = await request(app).get(`/planners/user/${username}`)
      expect(res.statusCode).toBe(500)
      expect(res.body).toEqual({ 
        success: false,
        message: 'Internal server error',
        error: expect.any(Object)
      })
      findSpy.mockRestore()
    })
  }),

  describe('GET /planners/date/:date', () => {
    it('should get planner by date', async () => {
      const findSpy = jest.spyOn(Planner, 'find').mockResolvedValue(samplePlanners)
      jest.spyOn(Planner, 'insertMany').mockResolvedValue()
      const date = samplePlanners[0].date
      const res = await request(app).get(`/planners/date/${date}`)
      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body.planners)).toBeTruthy()
      expect(res.body.success).toEqual(true)
      findSpy.mockRestore()
    })

  it('returns 404 if no planners found by date', async () => {
    const findSpy = jest.spyOn(Planner, 'find').mockResolvedValue([])
      const date = '2021-02-10'
      const res = await request(app).get(`/planners/date/${date}`)
      expect(res.statusCode).toEqual(404)
      expect(res.body.success).toEqual(false)
      findSpy.mockRestore()
    })

  it('handles errors', async () => {
    const findSpy = jest.spyOn(Planner, 'find').mockRejectedValueOnce(new Error('Date not found'))
    const date = '1999-08-02'
    const res = await request(app).get(`/planners/date/${date}`)
    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({ 
      success: false,
      message: 'Date not found',
      error: expect.any(Object)
    })
    findSpy.mockRestore()
    })
  }),

  describe('GET /planners/tag/:tag', () => {
    it('should get planner by tag', async () => {
      const findSpy = jest.spyOn(Planner, 'find').mockResolvedValue(samplePlanners)
      jest.spyOn(Planner, 'insertMany').mockResolvedValue()
      const tag = samplePlanners[0].tag
      const res = await request(app).get(`/planners/date/${tag}`)
      expect(res.statusCode).toEqual(200)
      expect(Array.isArray(res.body.planners)).toBeTruthy()
      expect(res.body.success).toEqual(true)
      findSpy.mockRestore()
    })
  
    it('returns 404 if no planners found by date', async () => {
      const findSpy = jest.spyOn(Planner, 'find').mockResolvedValue([])
        const tag = 'tagdoesnotexist'
        const res = await request(app).get(`/planners/tag/${tag}`)
        expect(res.statusCode).toEqual(404)
        expect(res.body.success).toEqual(false)
        findSpy.mockRestore()
    })

    it('handles errors', async () => {
      const findSpy = jest.spyOn(Planner, 'find').mockRejectedValueOnce(new Error('Tag not found'))
      const tag = 'Food'
      const res = await request(app).get(`/planners/tag/${tag}`)
      expect(res.statusCode).toBe(404)
      expect(res.body).toEqual({ 
        success: false,
        message: 'Tag not found',
        error: expect.any(Object)
      })
      findSpy.mockRestore()
    })
  }),

  describe('POST /planners', () => {
    it('should create a new planner', async () => {
      const createSpy = jest.spyOn(Planner, 'create').mockResolvedValue(samplePlanners[0])
      const res = await request(app).post('/planners').send(samplePlanners[0])
      expect(res.statusCode).toEqual(201)
      expect(res.body.respond.username).toEqual(samplePlanners[0].username)
      createSpy.mockRestore()
    })

    it('should return 400 if missing required fields', async () => {
      const res = await request(app).post('/planners').send({})
      expect(res.statusCode).toEqual(400)
    })

    it('throws error if event cannot be created', async () => {
      const createSpy = jest.spyOn(Planner, 'create').mockRejectedValueOnce(new Error('Unable to create new event'))
      const res = await request(app).post(`/planners`).send({})
      expect(res.statusCode).toBe(404)
      expect(res.body).toEqual({ 
        success: false,
        message: 'Unable to create new event',
        error: expect.any(Object)
      })
      createSpy.mockRestore()
    })
  }),

  describe('PATCH /planners/:id', () => {
    it('should update a planner by Id', async () => {
      const createSpy = jest.spyOn(Planner, 'create').mockResolvedValue(samplePlanners[0])
      const updatedContent = 'Updated content'
      const findByIdAndUpdateSpy = jest.spyOn(Planner, 'findByIdAndUpdate').mockResolvedValue({
          _id: samplePlanners[0]._id, 
          content: updatedContent
        })
      const res = await request(app)
        .patch(`/planners/${samplePlanners[0]._id}`) 
        .send({ content: updatedContent })
      expect(res.statusCode).toEqual(200)
      createSpy.mockRestore()
      findByIdAndUpdateSpy.mockRestore()
    })

    it('should return 404 if planner not found by Id', async () => {
      const findByIdAndUpdateSpy = jest.spyOn(Planner, 'findByIdAndUpdate').mockResolvedValue(null)
      const res = await request(app)
        .patch('/planners/invalid-id')
        .send({ content: 'Updated content' })
      expect(res.statusCode).toEqual(404)
      findByIdAndUpdateSpy.mockRestore()
    })
  }),

  describe('DELETE /planners/:id', () => {
    it('should delete a planner by Id', async () => {
      const findByIdAndDeleteSpy = jest.spyOn(Planner, 'findByIdAndDelete').mockResolvedValue(null);
      const res = await request(app).delete(`/planners/${samplePlanners[0]._id}`);
      expect(res.statusCode).toEqual(404);
      expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(samplePlanners[0]._id);
      findByIdAndDeleteSpy.mockRestore();
    })

    it('should return 204 if planner deletion was unsuccessful', async () => {
      const findByIdAndDeleteSpy = jest.spyOn(Planner, 'findByIdAndDelete').mockResolvedValueOnce("error")
      const res = await request(app).delete('/planners/invalid-id')
      expect(res.statusCode).toEqual(204)
      findByIdAndDeleteSpy.mockRestore()
    })
  })
})