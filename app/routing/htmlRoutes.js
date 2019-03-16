let express = require("express");
let router = express.Router();
let path = require("path");
let fs = require("fs");

router.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

router.get("*", (req, res) => {
    console.log("*");
    res.sendFile(path.join(__dirname, "../public/home.html"))
});

router.post("/submit", (req, res) => {
    let entry = {
        "name": req.body.username,
        "photo": req.body.userpic,
        "scores" : []
    };
    for(let i = 1; i < 11; i++)
        entry.scores.push(req.body[i]);
    
    console.log(entry);

    entry = JSON.stringify(entry,null,2); 
    
    fs.appendFile(path.join(__dirname, "../data/friends.js"),entry, (err) => {
        if(err)
            return console.log(err); 

    });
    res.send();
});

module.exports = router; 