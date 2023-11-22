const express = require("express");

const app = new express();

app.get(
    "/",
    (req,res)=>{
        res.send("Hello, we are here! and this is entered after the code is compile and running to see if the nodemon is working on runtime or not or it crashes or not let see if this all get to the main page of the website on port 5000. This is the text send after the original text and checked working and also tested on mobile not sure how the out put looks like but we will see what is going on!")//asdfadf
    }
)

app.listen(
    "5000",
    ()=>console.log("Background is running")
)