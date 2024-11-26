const EventEmitter = require("events");

let url = "https://github.com/samdahboss";

class LoggerClass extends EventEmitter {
  logger = (message) => {
    console.log(message);
    console.log(this)
    //Raise an event
    this.emit("MessageLogged", { data: 1, url: "https://" });
  };
}

module.exports.LoggerClass = LoggerClass;
