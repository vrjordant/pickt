const express = require('express');
const router = express.Router();
const users = require("../data/users");
const uuid = require("uuid/v4");

router.post("/", async (req, res) => {
	const un = req.body.username;
	const pw = req.body.password;

	let auth = false;
	let err = "Did not provide a valid username/password.";
	try {
		auth = await users.validate(un, pw);
	} catch (e) {
		err = e;
	}

	if (auth) {
		const sid = uuid();
		res.cookie("AuthCookie", sid);
		try {
			await users.addSession(un, sid);
		} catch (e) {
			throw(e);
		}
		res.redirect("/feed");
	} else {
		res.render("root", {title: "Login Screen", error: err});
	}
});

module.exports = router;