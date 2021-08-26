require('dotenv').config(); // ALLOWS ENV VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT THE TOP

const courseFromDb = [
    // 1 obj = 1 chap-content
    // 1 chap-content = * articles
    // 1 article = 1 title + * art-content
    { 
      chapTitle: "Async JS Intro",
      content: [
      { title: "Intro", content: "lorem ipsumdolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. At, animi eaque rerum amet quibusdam et possimus!" }, 
      { title: "Example", content: "lorem ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio earum, repudiandae voluptates porro, corrupti sunt assumenda natus blanditiis rem rerum itaque, consequuntur cumque veritatis veniam dolore deleniti nisi optio sapiente! Neque molestiae rem quia commodi pariatur provident voluptates. Excepturi deleniti hic obcaecati animi perspiciatis ipsam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eveniet eos ullam, non iusto, maiores dolor numquam dicta amet vitae commodi pariatur doloribus corrupti, dolorem beatae temporibus vel." }, 
      { title: "Issue with async code", content: "lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. At, animi eaque rerum amet quibusdam et possimus!" },
      ],
    },
    {
      chapTitle: "Using Promises",
      content: [
      { title: "What we're trying to achieve", content: "lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. At, animi eaque rerum amet quibusdam et possimus!" }, 
      { title: "Let's code : Promises in action", content: "lorem ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio earum, repudiandae voluptates porro, corrupti sunt assumenda natus blanditiis rem rerum itaque, consequuntur cumque veritatis veniam dolore deleniti nisi optio sapiente! Neque molestiae rem quia commodi pariatur provident voluptates. Excepturi deleniti hic obcaecati animi perspiciatis ipsam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eveniet eos ullam, non iusto, maiores dolor numquam dicta amet vitae commodi pariatur doloribus corrupti, dolorem beatae temporibus vel." },
      ],
    },
    {
      chapTitle: "Using Async Await",
      content: [
      { title: "Issue using Promises", content: "lorem ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio earum, repudiandae voluptates porro, corrupti sunt assumenda natus blanditiis rem rerum itaque, consequuntur cumque veritatis veniam dolore deleniti nisi optio sapiente! Neque molestiae rem quia commodi pariatur provident voluptates. Excepturi deleniti hic obcaecati animi perspiciatis ipsam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eveniet eos ullam, non iusto, maiores dolor numquam dicta amet vitae commodi pariatur doloribus corrupti, dolorem beatae temporibus vel." }, 
      { title: "Let's code: Async Await in action", content: "lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. At, animi eaque rerum amet quibusdam et possimus!" },
      ],
    },
    {
      chapTitle: "Conclusion",
      content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio earum, repudiandae voluptates porro, corrupti sunt assumenda natus blanditiis rem rerum itaque, consequuntur cumque veritatis veniam dolore deleniti nisi optio sapiente! Neque molestiae rem quia commodi pariatur provident voluptates. Excepturi deleniti hic obcaecati animi perspiciatis ipsam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eveniet eos ullam, non iusto, maiores dolor numquam dicta amet vitae commodi pariatur doloribus corrupti, dolorem beatae temporibus vel.",
      // If there's no subpart : content is a string
    },
  ];

const express = require('express');
const app = express();

// var bodyParser = require('body-parser');

// //To parse URL encoded data
// app.use(bodyParser.urlencoded({ extended: false }))

// //To parse json data
// app.use(bodyParser.json())

app.use(express.json()); // parse JSON bodies in the req object
// app.use('static', ''); // parse JSON bodies in the req object

app.get('/', function(req, res){
    res.send("Hello World !");
});
app.get('/course', function(req, res){ // course/:id
    // res.send("Hello World !");
    res.json(courseFromDb);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: 'Smth went wrong.',
    });
});
 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));