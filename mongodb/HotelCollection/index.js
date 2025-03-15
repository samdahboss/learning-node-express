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
  price: Number,
  category: String,
  tags: [String],
  date: { type: Date, default: Date.now },
});

const Hotel = mongoose.model("hotels", hotelSchema);

const createHotel = async (name, address, owner, price, category, tags) => {
  const hotel = new Hotel({
    name,
    address,
    owner,
    price,
    category,
    tags,
  });

  const result = await hotel.save();
  console.log(result);
};

// createHotel("Indiana Hotel", "Ondo", "Alice Okonkwo", 500000, "2 Star", [
//   "Luxury",
//   "Expensive",
// ]);
const hotelsArray = [
  {
    name: "Tropical Hotel",
    address: "123 Beach Ave",
    owner: "Alice Johnson",
    price: 150,
    category: "3 Star",
    tags: ["Beach", "Relax"],
  },
  {
    name: "Eko Hotel",
    address: "456 City Rd",
    owner: "Bob Smith",
    price: 250,
    category: "4 Star",
    tags: ["Business", "Luxury"],
  },
  {
    name: "Diana Hotel",
    address: "789 Mountain St",
    owner: "Carol White",
    price: 350,
    category: "5 Star",
    tags: ["Mountain", "Adventure"],
  },
  {
    name: "Oceanview Hotel",
    address: "101 Ocean Dr",
    owner: "David Brown",
    price: 450,
    category: "3 Star",
    tags: ["Ocean", "Scenic"],
  },
  {
    name: "Parkinn Hotel",
    address: "202 Park Ln",
    owner: "Eve Davis",
    price: 550,
    category: "4 Star",
    tags: ["Park", "Family"],
  },
  {
    name: "Sunset Hotel",
    address: "303 Sunset Blvd",
    owner: "Frank Wilson",
    price: 650,
    category: "5 Star",
    tags: ["Sunset", "Romantic"],
  },
  {
    name: "Greenfield Hotel",
    address: "404 Greenfield Ave",
    owner: "Grace Lee",
    price: 750,
    category: "3 Star",
    tags: ["Nature", "Eco"],
  },
  {
    name: "Skyline Hotel",
    address: "505 Skyline Dr",
    owner: "Henry Kim",
    price: 850,
    category: "4 Star",
    tags: ["City", "Modern"],
  },
  {
    name: "Lakeside Hotel",
    address: "606 Lakeside St",
    owner: "Ivy Martinez",
    price: 950,
    category: "5 Star",
    tags: ["Lake", "Tranquil"],
  },
  {
    name: "Riverside Hotel",
    address: "707 Riverside Rd",
    owner: "Jack Garcia",
    price: 1050,
    category: "3 Star",
    tags: ["River", "Peaceful"],
  },
  {
    name: "Mountainview Hotel",
    address: "808 Mountainview Dr",
    owner: "Karen Rodriguez",
    price: 1150,
    category: "4 Star",
    tags: ["Mountain", "Hiking"],
  },
  {
    name: "Seaside Hotel",
    address: "909 Seaside Blvd",
    owner: "Leo Hernandez",
    price: 1250,
    category: "5 Star",
    tags: ["Sea", "Luxury"],
  },
  {
    name: "Forest Hotel",
    address: "1010 Forest Ln",
    owner: "Mia Clark",
    price: 1350,
    category: "3 Star",
    tags: ["Forest", "Adventure"],
  },
  {
    name: "Desert Hotel",
    address: "1111 Desert Rd",
    owner: "Noah Lewis",
    price: 1450,
    category: "4 Star",
    tags: ["Desert", "Exotic"],
  },
  {
    name: "Island Hotel",
    address: "1212 Island Dr",
    owner: "Olivia Walker",
    price: 1550,
    category: "5 Star",
    tags: ["Island", "Resort"],
  },
  {
    name: "Countryside Hotel",
    address: "1313 Countryside Ave",
    owner: "Paul Hall",
    price: 1650,
    category: "3 Star",
    tags: ["Countryside", "Relax"],
  },
  {
    name: "Urban Hotel",
    address: "1414 Urban St",
    owner: "Quinn Allen",
    price: 1750,
    category: "4 Star",
    tags: ["Urban", "Modern"],
  },
  {
    name: "Historic Hotel",
    address: "1515 Historic Blvd",
    owner: "Rachel Young",
    price: 1850,
    category: "5 Star",
    tags: ["Historic", "Luxury"],
  },
  {
    name: "Boutique Hotel",
    address: "1616 Boutique Ln",
    owner: "Sam King",
    price: 1950,
    category: "3 Star",
    tags: ["Boutique", "Chic"],
  },
  {
    name: "Luxury Hotel",
    address: "1717 Luxury Dr",
    owner: "Tina Scott",
    price: 2050,
    category: "5 Star",
    tags: ["Luxury", "Exclusive"],
  },
];
const createHotels = async () => {
  const result = await Hotel.insertMany(hotelsArray);
  console.log(result);
};

// createHotels();

const getHotels = async () => {
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than or equal to)
  //lt (less than)
  //lte (less than or equal to)
  //in
  //nin (not in)
  //or
  //and

  const hotels = await Hotel.find({
    $or: [
      { category: "4 Star", price: { $gte: 150, $lte: 1000 } },
      { owner: /^Alice/i }, // starts with alice, add i to make case insensitive
      //   { owner: /Johnson$/i }, //ends with johnson
      //   { owner: /.*Alice.*/i }, //contains alice at all, no matter the number of characters before and after
    ],
  })
    .limit(10)
    .sort({ price: 1 })
    .select({ name: 1, address: 1, category: 1, price: 1, owner: 1 })
    .countDocuments(); //just to return number if items that match a certain criteria;

  console.log(hotels);
};

getHotels();
