// DEPENDENCIES
const fs = require("fs");
const express = require("express")
const path = require("path");



// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

//create paths for index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

//create path for notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

//display notes from the db folder
app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", (err, notes) => {
        if (err) {
            console.log(err);
            return
        }
        res.json(JSON.parse(notes))
    })
})

//post notes to db.json
app.post("/api/notes", (req, res) => {
    const newNote = req.body
    let notesArray = []
    fs.readFile(path.join(__dirname, "db/db.json"), (err, data) => {
        if (err) {
            return console.log(err);
        }
        if(data === "") {
            notesArray.push({ 
                "id": 1,
                "title": newNote.title,
                "text": newNote.text,
            })
        } else {
            console.log(data);
            notesArray = JSON.parse(data)
            notesArray.push({
            "id": notesArray.length + 1,
            "title": newNote.title,
            "text": newNote.text,
            })
        }
        fs.writeFile((path.join(__dirname + "/db/db.json")), JSON.stringify(notesArray), (error) => {
            if (error) {
                return console.log(error);
            }
            res.json(notesArray)
        })

    })

    res.status(200).json(req.body)
})


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});