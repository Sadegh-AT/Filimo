const express = require("express");

const app = express();
const users = [
  {
    id: 1,
    name: "John Smith",
    username: "jsmith123",
    age: 30,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "sarahj",
    age: 28,
  },
  {
    id: 3,
    name: "Michael Brown",
    username: "mikeb",
    age: 35,
  },
  {
    id: 4,
    name: "Emily Davis",
    username: "emdavis",
    age: 25,
  },
  {
    id: 5,
    name: "David Wilson",
    username: "davidw88",
    age: 32,
  },
  {
    id: 6,
    name: "Lisa Rodriguez",
    username: "lisarod",
    age: 29,
  },
  // Continue adding more user objects as needed...
];
app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  res.json(users.filter((item) => item.id == req.params.id));
});
app.listen(3000, () => {
  console.log("Server Run on Port 3000");
});
