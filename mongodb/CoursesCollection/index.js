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
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
    .limit(10)
    .sort("-price")
    .select("name author price");

  console.log(courses);
};

// getCourses();

//update course using query first approach
const updateCourseQueryFirst = async (id) => {
  const course = await Course.findById(id);
  if (!course) return "Course not found";

  //   course.isPublished = true;
  //   course.author = "Another Author";

  course.set({
    name: "Software Development",
    isPublished: true,
    author: "WumiCodes",
    price: 200,
  });

  const updatedCourse = await course.save();
  console.log(updatedCourse);
};

// updateCourseQueryFirst("67d575d300b416d58c3379bd");

//update course using update first approach
const updateCourseUpdateFirst = async (id) => {
  const course = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Jesujoba",
        isPublished: true,
      },
    }
  );

  console.log(course);
};

updateCourseUpdateFirst("67d575d300b416d58c3379bd");

//remove course
const removeCourse = async (id) => {
  const course = await Course.deleteOne({ _id: id });
  console.log(course);
};

// removeCourse("67d575d300b416d58c3379bd");
