import express from "express";

//importing third party middlewares
import helmet from "helmet";
import morgan from "morgan";

//importing config
import { config } from "dotenv";
import AppConfig from "config";
config(); //configuring the environment

//importing debugger modules
import debug from "debug";
const startupDebugger = debug("app:startup");
const dbDebugger = debug("app:db");

//importing routes
import { hotelApiRouter } from "./routes/hotel.js";
import { HomeRouter } from "./routes/home.js";
import { GenreRouter } from "./routes/vidly.js";
import { CoursesRouter } from "./routes/courses.js";

// express app
const app = express();
app.use(express.json());
app.use(express.static("public")); //built-in middleware to provide static assets e.g localhost:3000/image.png

//middlewares
app.use(helmet()); //middle ware to secure express applications

//adding templating engine
app.set("view engine", "pug");
app.set("views", "./views"); //default


app.use("/api/hotels", hotelApiRouter);
app.use("/api/courses", CoursesRouter);
app.use("/api/genres", GenreRouter);
app.use("/", HomeRouter);

//getting the current environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

if (app.get("env") === "development") {
  //optionally use morgan middleware in development only
  app.use(morgan("tiny")); // (morgan is for logging api requests to the server)
  startupDebugger("Morgan Middleware Enabled....");
}

//db work
dbDebugger("Connected to the database....");

//configuration
console.log("Application Name: " + AppConfig.get("name"));
console.log("Mail Server: " + AppConfig.get("mail.host"));
console.log("Mail Password: " + AppConfig.get("mail.password"));

const PORT = process.env.HOTEL_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Hotel API is running on port ${PORT}`);
});
