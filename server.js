// DEPENDENCIES
const fs = require("fs");
const http = require("http");
const express = require("express")
const path = require("path")


// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create paths for index.html and notes.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});