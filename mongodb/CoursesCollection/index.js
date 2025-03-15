const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/LearningExpress")
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  price: Number,
  tags: [String],
  isPublished: Boolean,
  author: String,
  date: { type: Date, default: Date.now() },
});

const Course = new mongoose.model("courses", courseSchema);

const AddCourse = async (name, price, tags, isPublished, author) => {
  const course = new Course({
    name,
    price,
    tags,
    isPublished,
    author,
  });

  const newCourse = await course.save();
  console.log(newCourse);
};

// AddCourse("My Courses", 10000, ["best-seller"], true, "Olawumi Samuel");

const getCourses = async () => {
  const courses = await Course.find({
    isPublished: true,
  })
    .or([{ tags: "backend" }, { tags: "frontend" }])
    .limit(10)
    .sort("-price")
    .select("name author");

  console.log(courses);
};

getCourses();
