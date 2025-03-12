import express from "express";

//importing joi for validation
import Joi from "joi";

export const hotelApiRouter = express.Router();

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

//api to get all hotel
hotelApiRouter.get("/", (req, res) => {
  res.send(hotels);
});

//api to get specific hotel
hotelApiRouter.get("/:id", (req, res) => {
  const hotel = hotels.find((h) => h.hotel_id === parseInt(req.params.id));

  if (!hotel)
    return res.status(404).send("An Hotel with the given id was not found");

  res.send(hotel);
});

//api to add a hotel
hotelApiRouter.post("/", (req, res) => {
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
hotelApiRouter.put("/:id", (req, res) => {
  const hotel = hotels.find((h) => h.hotel_id === parseInt(req.params.id));

  if (!hotel)
    return res.status(404).send("An Hotel with the given id was not found");

  const { error } = validateHotel(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  hotel.hotel_name = req.body.hotel_name;
  res.send(hotel);
});

//api to delete a hotel
hotelApiRouter.delete("/:id", (req, res) => {
  const hotel = hotels.find((h) => h.hotel_id === parseInt(req.params.id));
  if (!hotel)
    return res.status(404).send("An Hotel with the given id was not found");

  const index = hotels.indexOf(hotel);
  hotels.splice(index, 1);

  res.send(hotel);
});
