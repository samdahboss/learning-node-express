import express from "express";
import { config } from "dotenv";
import Joi from "joi";

config();
const vidlyApi = express();
vidlyApi.use(express.json());

//genre array
const genres = [
  { genre_id: 1, genre_name: "action" },
  { genre_id: 2, genre_name: "biography" },
  { genre_id: 3, genre_name: "western" },
  { genre_id: 4, genre_name: "neo-noir" },
  { genre_id: 5, genre_name: "psychological thriller" },
  { genre_id: 6, genre_name: "adventure" },
];

// function to validate genre
const validateGenre = (genre) => {
  const schema = Joi.object({
    genre_name: Joi.string().min(5).required(),
  });
  return schema.validate(genre.body);
};

//return genre array
vidlyApi.get("/api/genres", (req, res) => {
  res.send(genres);
});

//get a specific genre by id
vidlyApi.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.genre_id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send("Bad request: invalid Genre");

  res.send(genre);
});

//adding a genre to the array
vidlyApi.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    genre_id: genres.length + 1,
    genre_name: req.body.genre_name,
  };

  genres.push(genre);
  res.send(genres);
});

//updating a genre
vidlyApi.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.genre_id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  const { error } = validateGenre(req);
  if (error) return res.status(400).send(error.details[0].message);

  genre.genre_name = req.body.genre_name;
  res.send(genres);
});

//delete a genre
vidlyApi.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.genre_id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});
//PORT - gotten from env file
const port = process.env.VIDLY_PORT || 3000;
vidlyApi.listen(port, () => console.log(`Listening on port ${port}...`));
