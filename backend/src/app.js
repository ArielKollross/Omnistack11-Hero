const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const { errors } = require('celebrate')

const app = express()
//app.listen(3333)
app.use(cors()) //todas aplicações front end podem acessar a API Rest
app.use(express.json())
app.use(routes)
app.use(errors())

module.exports = app
