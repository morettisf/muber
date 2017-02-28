const assert = require('assert')
const request = require('supertest')
const app = require('../app')

describe('The express app', () => {
  it('handles a GET request to /api', (done) => {
    request(app) // supertest library syntax
      .get('/api') // supertest library syntax
      .end((err, response) => { // supertest library syntax
        assert(response.body.hi === 'there')
        done()
      })
  })
})