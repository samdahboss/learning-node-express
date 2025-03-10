import express from "express";
import Joi from "joi";
import { config } from "dotenv";

config();
const hotelApi = express();
hotelApi.use(express.json());

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
    hotel_id: Joi.number(),
    hotel_name: Joi.string().min(5).required(),
  });

  return schema.validate(hotel);
};

//api to get all hotel
hotelApi.get("/api/hotels", (req, res) => {
  res.send(hotels);
});

//api to get specidifc hotel
hotelApi.get("/api/hotel/:id", (req, res) => {
  const hotel = hotels.find((h) => h.hotel_id === parseInt(req.params.id));

  if (!hotel)
    return res.status(404).send("An Hotel with the given id was not found");

  const {error} = validateHotel(req.body);
  if (error) return res.status(400).send("Bad request: invalid Hotel");

  res.send(hotel);
});

//api to add a hotel
hotelApi.post("api/hotels", (req, res)=>{
    const {error} = validateHotel(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const hotel ={
        hotel_id: hotels.length + 1,
        hotel_name: req.body.hotel_name
    }
    
    hotels.push(hotel);
    res.send(hotels);
})



const PORT = process.env.HOTEL_PORT || 3000;
hotelApi.listen(PORT, () => {
  console.log(`Hotel API is running on port ${PORT}`);
});
