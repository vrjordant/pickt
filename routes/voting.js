const express = require('express');
const router = express.Router();
const users = require("../data/users");

router.get("/Local/Hudson_County", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		throw (e);
	}
	
	(user == null ? auth=true : auth=false)

	if (auth == false) {
		let data = {
			title: "Hudson_County"
		}
		res.render("voting", data);
	} else {
		let data = {
			title: "Error 403",
			issue: "You are not logged in."
		}
		res.render("error", data);
	}
});

router.get("/State/New_Jersey", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		throw (e);
	}
	
	(user == null ? auth=true : auth=false)

	if (auth == false) {
		let data = {
			title: "New_Jersey"
		}
		res.render("voting", data);
	} else {
		let data = {
			title: "Error 403",
			issue: "You are not logged in."
		}
		res.render("error", data);
	}
});

router.get("/Region/East_Coast", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		throw (e);
	}
	
	(user == null ? auth=true : auth=false)

	if (auth == false) {
		let data = {
			title: "East_Coast"
		}
		res.render("voting", data);
	} else {
		let data = {
			title: "Error 403",
			issue: "You are not logged in."
		}
		res.render("error", data);
	}
});

router.get("/USA", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		throw (e);
	}
	
	(user == null ? auth=true : auth=false)

	if (auth == false) {
		let data = {
			title: "USA"
		}
		res.render("voting", data);
	} else {
		let data = {
			title: "Error 403",
			issue: "You are not logged in."
		}
		res.render("error", data);
	}
});

module.exports = router;