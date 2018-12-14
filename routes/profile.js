const express = require('express');
const router = express.Router();
const users = require("../data/users");
const gallery = require("../data/gallery");

router.get("/", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		//throw (e);
	}
	
	(user == null ? auth=true : auth=false)
	if (auth == false) {
		let profile = user.profile;
		let uploads = await gallery.getPostsByUser(user._id);

		// Calculates the number of votes a user has gotten on all their pictures
		let totalLocalVotes = 0;
		let totalStateVotes = 0;
		let totalRegionalVotes = 0;
		let totalNationalVotes = 0;
		for (let i = 0; i < uploads.length; i++) {
			const currentPicture = uploads[i];
			totalLocalVotes += currentPicture.vote_local;
			totalStateVotes += currentPicture.vote_state;
			totalRegionalVotes += currentPicture.vote_regional;
			totalNationalVotes += currentPicture.vote_national;
		}
		let totalVotesEver = totalLocalVotes + totalStateVotes + totalRegionalVotes + totalNationalVotes;

		// Simple clout calculation
		let cloutLevel = Math.floor(totalVotesEver/10);
		let cloutTrophies = ["😬","👶","🔥","😎","💯","🐐","🆑🅾️⛎♈️⁉️"];
		let cloutSymbol = "";
		if (cloutLevel >= 6) {
			cloutSymbol = cloutTrophies[6];
		}
		else {
			cloutSymbol = cloutTrophies[cloutLevel];
		}

		let data = {
			title: "Profile",
			profile,
			uploads,
			totalLocalVotes,
			totalStateVotes,
			totalRegionalVotes,
			totalNationalVotes,
			totalVotesEver,
			cloutLevel,
			cloutSymbol,
			vote_local: user.vote_local,
			vote_state: user.vote_state,
			vote_regional: user.vote_regional,
			vote_national: user.vote_national,
			victories: user.victories
		}
		res.render("profile", data);
	} else {
		let data = {
			title: "Error 403",
			issue: "You are not logged in."
		}
		res.render("error", data);
	}
});

module.exports = router;