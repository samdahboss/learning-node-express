import express from "express";
//importing third party middlewares
import helmet from "helmet";
import morgan from "morgan";
//importing joi for validation
import Joi from "joi";
import log from "./log.js";
//importing config
import { config } from "dotenv";
import AppConfig from 'config';
//importing debugger modules
import debug from "debug";
const startupDebugger = debug("app:startup");
const dbDebugger = debug("app:db");

config();

//hotel api express
const hotelApi = express();
hotelApi.use(express.json());
hotelApi.use(express.static("public")); //built-in middleware to provide static assets e.g localhost:3000/image.png

//adding templating engine
hotelApi.set("view engine", "pug");
hotelApi.set("views", "./views"); //default

//getting the current environment
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`hotelApi: ${hotelApi.get("env")}`);

//middlewares
hotelApi.use(helmet()); //middle ware to secure express applications

if (hotelApi.get("env") === "development") {
  //optionally use morgan middleware in development only
  hotelApi.use(morgan("tiny")); // (morgan is for logging api requests to the server)
  startupDebugger("Morgan Middleware Enabled....");
}

//db work
dbDebugger("Connected to the database....");

//custom middleware for logging
hotelApi.use(log);

//configuration
// console.log("Application Name: " + AppConfig.get("name"));
// console.log("Mail Server: " + AppConfig.get("mail.host"));
// console.log("Mail Password: " + AppConfig.get("mail.password"));

// hotel array
const hotels = [
  { hotel_id: 1, hotel_name: "Marriot" },
  { hotel_id: 2, hotel_name: "Hilton" },
  { hotel_id: 3, hotel_name: "Sheraton" },
  { hotel_id: 4, hotel_name: "Hyatt" },
  { hotel_id: 5, hotel_name: "Radisson" },
  { hotel_id: 6, hotel_name: "Ritz-Carlton" },
  { hotel_id: 7, hotel_name: "Four Seasons" },
  { hotel_id: 8, hotel_name: "Waldorf Astoria" },
  { hotel_id: 9, hotel_name: "Intercontinental" },
  { hotel_id: 10, hotel_name: "Fairmont" },
];

//function to validate hotel
const validateHotel = (hotel) => {
  const schema = Joi.object({
    hotel_name: Joi.string().min(5).required(),
  });

  return schema.validate(hotel);
};

hotelApi.get("/", (req, res) => {
  res.render("index", { title: "Hotel API", message: "Welcome to Hotel API" });
});

//api to get all hotel
hotelApi.get("/api/hotels", (req, res) => {
  res.send(hotels);
});

//api to get specific hotel
hotelApi.get("/api/hotel/:id", (req, res) => {
  const hotel = hotels.find((h) => h.hotel_id === parseInt(req.params.id));

  if (!hotel)
    return res.status(404).send("An Hotel with the given id was not found");

  res.send(hotel);
});

//api to add a hotel
hotelApi.post("/api/hotels", (req, res) => {
  const { error } = validateHotel(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const hotel = {
    hotel_id: hotels.length + 1,
    hotel_name: req.body.hotel_name,
  };

  hotels.push(hotel);
  res.send(hotel);
});

//api to update a hotel
hotelApi.put("/api/hotel/:id", (req, res) => {
  const hotel = hotels.find((h) => h.hotel_id === parseInt(req.params.id));

  if (!hotel)
    return res.status(404).send("An Hotel with the given id was not found");

  const { error } = validateHotel(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  hotel.hotel_name = req.body.hotel_name;
  res.send(hotel);
});

//api to delete a hotel
hotelApi.delete("/api/hotel/:id", (req,res)=>{
  const hotel = hotels.find(h => h.hotel_id === parseInt(req.params.id));
  if(!hotel) return res.status(404).send('An Hotel with the given id was not found');

  const index = hotels.indexOf(hotel);
  hotels.splice(index, 1);

  res.send(hotel);
})

const PORT = process.env.HOTEL_PORT || 3000;
hotelApi.listen(PORT, () => {
  console.log(`Hotel API is running on port ${PORT}`);
});
