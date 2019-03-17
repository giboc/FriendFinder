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
        "scores": []
    };
    for (let i = 1; i < 11; i++)
        entry.scores.push(req.body[i]);

    fs.readFile(path.join(__dirname, "../data/friends.js"), (err, data) => {
        var json = JSON.parse(data);
        let match = {
            data: "",
            score: 999
        }
        
        json.forEach( (friend) => {
            let temp = 0;
            for(let i = 1; i < 11; i++){
                if(friend.scores[i] != entry.scores[i])
                    if(friend.scores[i] > entry.scores[i])
                        temp += (friend.scores[i] - entry.scores[i])
                    else
                        temp += (entry.scores[i] - friend.scores[i])
                else
                    temp+=0;

            }
            if(temp < match.score){
                match.score = temp;
                match.data = friend;
                
            }
                
        });

        

        json.push(entry)
        res.send(match);
        fs.writeFile(path.join(__dirname, "../data/friends.js"), JSON.stringify(json,null,2), (err) => {
            if(err)
                console.log(err);
        });
    })


    
    
});



module.exports = router; 