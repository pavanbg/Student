var express = require('express'); 
const app = express();

app.use(express.json());

const courses=[
 { id:1, n:'course1'},
 { id:2, n:'course2'},
 { id:3, n:'course3'}
];

app.get("/", function(req,res){
  res.send("Hello World");
});


app.get("/api/courses", function(req,res){
  res.send(courses);
});

app.get("/api/courses/:id", function(req,res){
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course)
    res.status(400).send("You Entered Id is not found");
  res.send(course);
});


app.post("/api/courses", function(req,res){
  const course={
    id : courses.length+1,
    n : req.body.n+parseInt(courses.length+1)
  };
  courses.push(course);
  res.send(course);
});

app.listen(3000, () => console.log("listening at port 3000"));
