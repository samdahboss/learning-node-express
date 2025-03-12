import express from "express";

export const HomeRouter = express.Router();

HomeRouter.get("/", (req, res) => {
  res.render("index", { title: "Hotel API", message: "Welcome to Hotel API" });
});
