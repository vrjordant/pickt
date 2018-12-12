const express = require('express');
const router = express.Router();
const users = require("../data/users");
const gallery = require("../data/gallery");
const multer = require('multer');
const upload = multer({dest:'./uploads'});
const fs = require("fs");
// const fileupload = require("express-fileupload");
// const image2base64 = require('image-to-base64');

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

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
router.post("/", upload.single('pic'), async (req, res) => {
	// assuming <input type="file" name="upload">
	try {
		console.log(req.file);
		let base64 = base64_encode(req.file.path);
		let picId = await gallery.addPost(base64,'12-11-2018',101);
		// console.log(picId);
		res.render("feed",{formLabel: "Upload Completed!"});
	}
	catch (e) {
		console.log(e);
	}
});

module.exports = router;