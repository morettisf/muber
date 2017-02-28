const mongoose = require('mongoose')

before(done => {
  mongoose.connect('mongodb://localhost/muber_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', error)
    })
})

beforeEach(done => {
  const { drivers } = mongoose.connection.collections
  drivers.drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' })) // recreate index in database for geometry after dropping drivers
    .then(() => done())
    .catch(() => done()) // runs 1st time tests start to catch error since there's no drivers yet
})