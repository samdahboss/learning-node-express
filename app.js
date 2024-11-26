// const express = require('express')
// const app = express()

// app.use(express.json())

const logger = require('./logger')

// logger.logger("Hello world!")

// const path = require('path')

// const pathObject = path.parse(__filename)

// console.log(pathObject)

// const fsmodule = require('fs');

// console.log(fsmodule.readdirSync('./'))

const EventEmitter = require("events");
const emitter = new EventEmitter();

//Listen for an event
emitter.on("MessageLogged", (arg) => {
  console.log("Listener Called");
});

// logger.logger.logger('logged message')

const logObject = new logger.LoggerClass()

logObject.logger("many me=fjbv message")
