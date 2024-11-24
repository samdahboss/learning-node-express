const express = require('express')
const app = express()

app.use(express.json())

const logger = require('./logger')

console.log(logger)