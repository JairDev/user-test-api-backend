// const http = require("http")
// import http from "http"
const express = require("express");
const cors = require("cors")
const logger = require("./logger");
const app = express();

app.use(cors())

app.use(express.json())

app.use(logger)

let data = [
  {
    id: 3,
    name: "Alfredo",
    age: "37",
    bitcoiner: true
  },
  {
    id: 2,
    name: "Alex",
    age: "35",
    bitcoiner: true

  },
  {
    id: 1,
    name: "Argenis",
    age: "39",
    bitcoiner: false
  },
  {
    id: 1,
    name: "Made",
    age: "50",
    bitcoiner: false
  },
];

// const app  = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   res.end('Hello World')
// })

app.get("/", (req, res) => {
  res.send("<h1>Hello World</>");
});

app.get("/users", (req, res) => {
  res.json(data);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = data.find((data) => data.id === id);
  if (user) {
    res.json(user);
  }else {
    res.status(404).end()
  }
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter(data => data.id !== id)
  res.status(204).end();
})

app.post("/users", (req,res) => {
  const user = req.body
  if(!user || !user.name) {
    return res.status(400).json({
      error: "User name is missing"
    })
  }
  const ids = data.map(user => user.id)
  const idMax = Math.max(...ids)
  const newUser = {
    id: idMax,
    name: user.name,
    age: user.age
  }
  data = [...data, newUser]
  res.status(201).json(newUser)
})

app.use((req, res) => {
  res.status(404).json({
    error: "Sorry back to home"
  })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
