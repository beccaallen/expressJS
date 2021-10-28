const express = require("express");
const path = require("path");
const fs = require("fs");
let app = express();

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// app.get("/", (req, res, next) => {
//   res.send("Hello from the web server side...");
//   next();
// });

app.use(express.urlencoded({ extended: false }));

app.post("/contact-form", (req, res) => {
  fs.readFile("users.json", (err, data) => {
    let users = JSON.parse(data);

    const newUser = {
        name: req.body.name,
        email: req.body.email
    }

    users.push(newUser)

    console.log(users, newUser, req.body)

    fs.writeFile("users.json", JSON.stringify(users), (err) => console.log(err))
  });

  res.redirect("/form-submissions");
});

app.get("/form-submissions", (req, res) => {
  fs.readFile("./users.json", { encoding: "utf-8" }, (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.use(express.static(path.join(__dirname, "../public")));

app.listen(3000);
