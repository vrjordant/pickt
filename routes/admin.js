const express = require('express');
const router = express.Router();
const users = require("../data/users");
const local = require("../data/local");
const moveUp = require("../tasks/moveup.js")

router.get("/", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		//throw (e);
	}
	
	(user != null && user.profile.username == "admin" ? auth=true : auth=false)
	if (auth == true) {
		let profile = user.profile;
		//let uploads = await gallery.getPostsByUser(user._id);
		let data = {
			title: "Profile",
			profile,
			//uploads
		}
		res.render("admin", data);
	} else {
		let data = {
			title: "YOU SHALL NOT PASS",
			issue: "You do not have admin privileges sorry"
		}
		res.render("error", data);
	}
});
router.post("/moveUp", async (req, res) => {
	moveUp.moveAllUp();
	const sid = req.cookies.AuthCookie;
	user = await users.getUserBySession(sid);
	let profile = user.profile;
	//let uploads = await gallery.getPostsByUser(user._id);
	let data = {
		title: "Profile",
		profile,
		//uploads
	}
	res.render("admin", data);

});
router.post("/changeTopic", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	user = await users.getUserBySession(sid);
	let profile = user.profile;
	//let uploads = await gallery.getPostsByUser(user._id);
	let data = {
		title: "Profile",
		profile,
		//uploads
	}
	console.log(req.body.update_topic)
	local.setTopic(req.body.update_topic)
	res.render("admin", data);
});


module.exports = router;