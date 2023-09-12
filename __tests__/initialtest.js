const express = require('express')
const { mockRequest, mockResponse } = require('jest-mock-req-res')
const mongoose = require('mongoose')
const app = require('../app')
const Planner = require('../db/setup')

jest.mock('mongoose')

describe('app.js', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /', () => {
    it('should respond with a JSON object', async () => {
      const req = mockRequest()
      const res = mockResponse()
      await app.routes['GET /'](req, res)
      
      expect(res.json).toHaveBeenCalledWith({
        name: 'Study App API',
        description: 'Welcome to your study buddy',
      })
      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('GET /planner', () => {
    it('should respond with planner data on successful fetch', async () => {
      const mockPlannerData = [
        { username: 'user1', date: new Date(), content: 'Task 1', tag: 'Study' },
        { username: 'user2', date: new Date(), content: 'Task 2', tag: 'Work' },
      ]

      Planner.find.mockResolvedValueOnce(mockPlannerData)

      const req = mockRequest();
      const res = mockResponse();
      await app.routes['GET /planner'](req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockPlannerData)
    })

    it('should respond with a 500 status on error', async () => {
      const errorMessage = 'Internal Server Error';

      Planner.find.mockRejectedValueOnce(new Error(errorMessage));

      const req = mockRequest()
      const res = mockResponse()
      await app.routes['GET /planner'](req, res)

      expect(console.error).toHaveBeenCalledWith('Error retrieving planner data:', expect.any(Error))
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
    })
  })
})
