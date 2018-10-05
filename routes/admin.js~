const express = require('express');
const router = express.Router();

router.use(function(req,res,next){
  console.log("middleware authenticate the admin");
  next()
});

const courses=[
 { id:1, n:'course1'},
 { id:2, n:'course2'},
 { id:3, n:'course3'}
];

router.get("/", function(req,res){
  res.send("Hello World");
});


router.get("/api/courses", function(req,res){
  res.send(courses);
});

router.get("/api/courses/:id", function(req,res){
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course)
    res.status(400).send("You Entered Id is not found");
  res.send(course);
});


router.post("/api/courses", function(req,res){
  const course={
    id : courses.length+1,
    n : req.body.n+parseInt(courses.length+1)
  };
  courses.push(course);
  res.send(course);
});


module.exports = router;
