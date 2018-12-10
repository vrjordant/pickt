const express = require('express');
const router = express.Router();
const uuid = require("uuid/v4");

router.post("/", async (req, res) => {
	const un = req.body.username;
    const pw = req.body.password;
    const pw2 = req.body.re_password;

    if (pw!== pw2){
        res.render("root", {title: "Login Screen", error: "Yo passwords don't match"});  
    }else{

        /*
        check if username exists
        Add boy to database then log in LULLLL
        */
        res.redirect(307, '/login');
    }

});

module.exports = router;