require('dotenv').config({ path: './test/.env.test' })
const request = require('supertest')
const server = require('../../app')
const Planner = require('../../controllers/plannerControllers')

describe('Planner Controller', () => {
  const samplePlanner = {
    username: 'Tester',
    content: 'Test content',
    date: '2023-01-01',
    tag: 'test'
  }

  let app;

  beforeAll(() => {
    app = server.listen(process.env.TEST_PORT)
  })

  afterAll(() => {
    app.close()
  })

  it('should create a new planner', async () => {
    const res = await request(app)
      .post('/planners')
      .send(samplePlanner)
    expect(res.statusCode).toEqual(201)
    expect(res.body.username).toEqual(samplePlanner.username)
  })

  it('should get all planners', async () => {
    const res = await request(app).get('/planners')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBeTruthy()
  })

  it('should get a planner by Id', async () => {
    const planner = await Planner.createPlanner(samplePlanner)
    const res = await request(app).get(`/planners/${planner.id}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body._id).toEqual(planner.id.toString())
  })
  
  it('should get planners by username', async () => {
    const planner = await Planner.createPlanner(samplePlanner)
    const res = await request(app).get(`/planners/username/${planner.username}`)
    expect(res.statusCode).toEqual(200);
    expect(res.body[0].username).toEqual(planner.username)
  })

  it('should get planners by date', async () => {
    const planner = await Planner.createPlanner(samplePlanner)
    const res = await request(app).get(`/planners/date/${planner.date}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body[0].date).toEqual(planner.date)
  })

  it('should get planners by tag', async () => {
    const planner = await Planner.createPlanner(samplePlanner);
    const res = await request(app).get(`/planners/tag/${planner.tag}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body[0].tag).toEqual(planner.tag)
  })

  it('should update a planner by Id', async () => {
    const planner = await Planner.createPlanner(samplePlanner);
    const update = { content: 'Updated Test Content' };
    const res = await request(app)
      .patch(`/planners/${planner._id}`)
      .send(update)
    expect(res.statusCode).toEqual(200)
    expect(res.body.content).toEqual(update.content)
  });

  it('should delete a planner by Id', async () => {
    const planner = await Planner.createPlanner(samplePlanner)
    const res = await request(app).delete(`/planners/${planner._id}`)
    expect(res.statusCode).toEqual(204)
  })
})
