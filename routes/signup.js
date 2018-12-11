const express = require('express');
const router = express.Router();
const users = require("../data/users");
const uuid = require("uuid/v4");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", async (req, res) => {
	const un = req.body.username;
    const pw = req.body.password;
    const pw2 = req.body.re_password;
    const name = req.body.name;
    const local = req.body.local;
    const state = req.body.state;
    const region = req.body.region;

    if (pw!== pw2){
        res.render("root", {title: "Login Screen", error: "Yo passwords don't match"});  
    }else{
        if(await users.checkUserExists(un)) {
            res.render("root", {title: "Login Screen", error: "User Already exists"});
        }
        else{
            const hash = await bcrypt.hash(pw, saltRounds);
            try{
                await users.addUser(un, name, hash, local, state, region);
            }
            catch(error){
                console.log(error)
            }
            res.redirect(307, '/login');
        }
    }

});

module.exports = router;