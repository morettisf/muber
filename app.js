const express = require('express')
const bodyParser = require('body-parser') // middleware
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const app = express()

mongoose.Promise = global.Promise
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber') // mongoose connects into mongo
}

app.use(bodyParser.json()) // .use - register middleware with Express
routes(app)

app.use((err, req, res, next) => { // middleware to handle errors. "Next" is a function to pass to next middleware in chain
  res.status(422).send({ error: err.message })
})

module.exports = app