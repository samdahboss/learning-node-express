import express from "express";

export const CoursesRouter = express.Router();

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
  ];
  
  //READ OPERATION
  CoursesRouter.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  CoursesRouter.get("/", (req, res) => {
    res.send(courses);
  });
  
  //RETURN A SINGLE COURSE WITH A GIVEN ID
  CoursesRouter.get("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
      res.status(404).send("The course with the given ID was not found");
      return;
    }
    res.send(course);
  });
  
  //CREATED COURSE VALIDATION FUNCTION FOR REUSABLILITY
  const validateCourse = (req) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
    return schema.validate(req.body);
  };
  
  //CREATED A NEW COURSE AND ADDED IT TO THE COURSES ARRAY
  CoursesRouter.post("/", (req, res) => {
    const { error } = validateCourse(req);
    if (error) {
      //400 bad request
      res.status(400).send(error.details[0].message);
      return;
    }
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };
  
    courses.push(course);
    res.send(course);
  });
  
  //UPDATING AN EXISTING COURSE
  CoursesRouter.put("/:id", (req, res) => {
    // FIND COURSE IN COURSES ARRAY
    //IF COURSE DOESN'T EXIST, RETURN 404 ERROR
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
      res.status(404).send("The course with the given ID was not found");
      return;
    }
  
    //VALIDATE THE COURSE THAT WAS FOUND
    const { error } = validateCourse(req);
    //IF THE COURSE IS INVALID RETURN 400 BAD REQUEST
    if (error) {
      //400 bad request
      res.status(400).send(error.details[0].message);
      return;
    }
  
    course.name = req.body.name;
    res.send(course);
  });
  
  //DELETE OPERATION
  CoursesRouter.delete("/:id", (req, res) => {
    // FIND COURSE IN COURSES ARRAY
    //IF COURSE DOESN'T EXIST, RETURN 404 ERROR
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
      res.status(404).send("The course with the given ID was not found");
      return;
    }
  
    //DELETING THE COURSE
    const index = courses.indexOf(course);
    courses.splice(index, 1);
  
    res.send(courses);
  });