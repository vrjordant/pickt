const express = require('express');
const router = express.Router();
const users = require("../data/users");
const gallery = require("../data/gallery");
const local = require("../data/local");

const multer = require('multer');
const upload = multer({dest:'./uploads'});
const fs = require("fs");
const date = require('date-and-time');

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
        const sid = req.cookies.AuthCookie;
        let user = await users.getUserBySession(sid);

        let localPosts = await local.getPostsByLocation(user.profile.local)
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
        if(req.file){
            let base64 = base64_encode(req.file.path);
            let now = new Date();

            const sid = req.cookies.AuthCookie;
            let user = await users.getUserBySession(sid);
            let pic = await gallery.addPost(base64, date.format(now, 'YYYY/MM/DD HH:mm:ss'),user._id);
            await local.addLocalPost("dogs", pic._id, user._id)

            res.redirect(307,"/feed");
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
                // console.log('path/file.txt was deleted');
            });
        }
        else{
            //no file submitted
            res.render("error", {issue: "need to add a file"});
        }
	}
	catch (e) {
		console.log(e);
	}
});

module.exports = router;