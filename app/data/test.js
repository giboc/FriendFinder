let fs = require ("fs");
console.log("test");
fs.readFile("friends.js", "utf8", (err,data)=>{
    data.forEach((friend)=>{
        console.log(friend.name);
    })
});