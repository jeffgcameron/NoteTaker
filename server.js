const fs = require("fs");
const express = require("express")

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.sendFile(path.join(`${_dirname}, index.html`))
})