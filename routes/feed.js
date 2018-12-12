const express = require('express');
const router = express.Router();
const users = require("../data/users");
const gallery = require("../data/gallery");
const local = require("../data/local");

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
        let localPosts = await local.getPostsByLocation("Union County")
        let local_post = []
        for (let i = 0; i < localPosts.length; i++){
            let post = await gallery.getPostById(localPosts[i]._id);
            local_post.push(post)
        }
		let data = {
			title: "FEED",
            formLabel: `Upload a Picture to submit! Topic: ${topic}`,
            localPosts: local_post
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
        let pic = await gallery.addPost(base64,'12-11-2018',"fc314b22-9144-4359-9e78-a2d97108f72b");
        await local.addLocalPost("dogs", pic._id, "fc314b22-9144-4359-9e78-a2d97108f72b")

		res.render("feed",{formLabel: "Upload Completed!"});
		fs.unlink(req.file.path, (err) => {
			if (err) throw err;
			// console.log('path/file.txt was deleted');
		});
	}
	catch (e) {
		console.log(e);
	}
});

module.exports = router;