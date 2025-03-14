const mongoose = require("mongoose");
const debug = require("debug");

const dbDebugger = debug("app:db");

mongoose
  .connect("mongodb://localhost:27017/LearningExpress")
  .then(() => {
    console.log("Connected to MongoDB...");
    dbDebugger("Connected to the database....");
  })
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const hotelSchema = new mongoose.Schema({
  name: String,
  address: String,
  owner: String,
  category: String,
  tags: [String],
  date: { type: Date, default: Date.now },
});

const Hotel = mongoose.model("hotels", hotelSchema);

const createHotel = async (name, address, owner, category, tags) => {
  const hotel = new Hotel({
    name,
    address,
    owner,
    category,
    tags,
  });

  const result = await hotel.save();
  console.log(result);
};

// createHotel("Indiana Hotel", "Ondo", "Ned Okonkwo", "4 Star", [
//   "Luxury",
//   "Expensive",
// ]);

const getHotels = async () => {
  const hotels = await Hotel.find({ category: "4 Star" })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, address: 1, category: 1 });
  console.log(hotels);
};

getHotels();
