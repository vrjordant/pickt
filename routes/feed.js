const express = require('express');
const router = express.Router();
const users = require("../data/users");

router.get("/", async (req, res) => {
	let topic = "Dogs";
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		console.log(e);
	}
	
	(user == null ? auth=false : auth=true)

	if (auth == true) {
		let data = {
			title: "FEED",
			formLabel: `Upload a Picture to submit! Topic: ${topic}`
		}
		res.render("feed", data);
	} else {
		let data = {
			title: "Error 403",
			issue: "You are not logged in."
		}
		res.render("error", data);
	}
});
router.post("/", async (req, res) => {
	try {
		console.log("HAPPENING");
		let test = req.body.pic;
		res.render("feed",{formLabel: "Upload Completed!"});
	}
	catch (e) {
		console.log(e);
	}
});

module.exports = router;