const Driver = require('../models/driver')

module.exports = {
  greeting(req, res) { // ES6 key and value. ES5 version - greeting: function(req, res){}
    res.send({ hi: 'there' })
  },

  index(req, res, next) {
    const { lng, lat } = req.query // query string in URL - after ? in URL. www.google.com?lng=80&lat=20

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] }, // parseFloat pulls decimal value out of query string URL
      { spherical: true, maxDistance: 200000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next)
  },

  create(req, res, next) {
    const driverProps = req.body
    
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next) // next pushes to the next middleware. In this case, the one we created to handle errors on app.js.
  },

  edit(req, res, next) {
    const driverId = req.params.id
    const driverProps = req.body

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps) // mongoose method
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next)
  },

  delete(req, res, next) {
    const driverId = req.params.id

    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next)
  }
}