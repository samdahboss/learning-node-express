// const express = require('express')
// const app = express()

// app.use(express.json())

// const logger = require('./logger')

// logger.logger("Hello world!")

// const path = require('path')

// const pathObject = path.parse(__filename)

// console.log(pathObject)

// const fsmodule = require('fs');

// console.log(fsmodule.readdirSync('./'))

const EventEmitter = require("events");
const emitter = new EventEmitter();

//Listen for an event
emitter.on("MessageLogged", function () {
  console.log("Listener Called");
});

//Raise an event
emitter.emit("MessageLogged");

//TASK 1

//Listening for the logging event
emitter.on("logging", (arg) =>{
    console.log(arg.data)
})

//Raising a logging event
emitter.emit("logging", {data: "just logging a random message for practicing events"})
