const express = require('express');
const router = express.Router();
const users = require("../data/users");
const gallery = require("../data/gallery");
const local = require("../data/local");
const state = require("../data/state");
const regional = require("../data/regional");
const national = require("../data/national");

const multer = require('multer');
const upload = multer({dest:'./uploads'});
const fs = require("fs");
const date = require('date-and-time');

router.get("/local", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		console.log(e);
	}
	
	(user == null ? auth=false : auth=true)
	if (auth == true) {
        
        let user = await users.getUserBySession(sid);
        votesRemaining = user.vote_local;
        let localPosts = await local.getPostsByLocation(user.profile.local)
        let local_post = []
        for (let i = 0; i < localPosts.length; i++){
            let post = await gallery.getPostById(localPosts[i]._id);
            local_post.push(post)
        }

        if (votesRemaining > 0) { 
			let data = {
		        title: "FEED",
				location: "local: " + user.profile.local,
				username: user.profile.username,
				visible: true,
		        formLabel: `Upload a Picture to submit! Topic: ${local.getTopic()}`,
		        posts: local_post
		    }
		    
			res.render("feed", data);
		} else { // no votes left
			let data = {
		        title: "FEED",
				location: "local: " + user.profile.local,
				username: user.profile.username,
				visible: true,
		        formLabel: `Upload a Picture to submit! Topic: ${local.getTopic()}`,
		        posts: local_post,
		        disabled: true
		    }
		    
			res.render("feed", data);
		}
	} else {
		let data = {
			title: "Error 403",
			issue: "You are not logged in."
		}
		res.render("error", data);
	}
});

router.get("/state", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		console.log(e);
	}
	
	(user == null ? auth=false : auth=true)
	if (auth == true) {
        
        let user = await users.getUserBySession(sid);
        
        let statePosts = await state.getPostsByLocation(user.profile.state)
        let state_post = []
        for (let i = 0; i < statePosts.length; i++){
            let post = await gallery.getPostById(statePosts[i]._id);
            state_post.push(post)
        }
		let data = {
            title: "FEED",
			location: "State: " + user.profile.state,
			username: user.profile.username,
            formLabel: `Upload a Picture to submit! Topic: ${local.getTopic()}`,
            posts: state_post
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

router.get("/regional", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		console.log(e);
	}
	
	(user == null ? auth=false : auth=true)
	if (auth == true) {

        let user = await users.getUserBySession(sid);
        
        let regionalPosts = await regional.getPostsByLocation(user.profile.region)
        let regional_post = []
        for (let i = 0; i < regionalPosts.length; i++){
            let post = await gallery.getPostById(regionalPosts[i]._id);
            regional_post.push(post)
        }
		let data = {
			title: "FEED",
			username: user.profile.username,
            location: "Region: " + user.profile.region,
            formLabel: `Upload a Picture to submit! Topic: ${local.getTopic()}`,
            posts: regional_post
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

router.get("/national", async (req, res) => {
	const sid = req.cookies.AuthCookie;
	let user = null;
	try {
		user = await users.getUserBySession(sid);
	} catch (e) {
		console.log(e);
	}
	
	(user == null ? auth=false : auth=true)
	if (auth == true) {                 
        let nationalPosts = await national.getAllNationalPosts()
        let national_post = []
        for (let i = 0; i < nationalPosts.length; i++){
            let post = await gallery.getPostById(nationalPosts[i]._id);
            national_post.push(post)
        }
		let data = {
			title: "FEED",
			username: user.profile.username,
            location: "National: United States",
            formLabel: `Upload a Picture to submit! Topic: ${local.getTopic()}`,
            posts: national_post
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
            await local.addLocalPost(pic._id, user._id)

            res.redirect(303,"/feed/local");
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

router.post("/upvote", async (req, res) => {
	// get user vote count
	const sid = req.cookies.AuthCookie;
	let user = await users.getUserBySession(sid);
	votesRemaining = user.vote_local;
	if (votesRemaining > 1) { 
		const sid = req.cookies.AuthCookie;
		let upvoteresult = await gallery.upvotePost(req.body.picID, sid, "local");
		//console.log(upvoteresult);
		res.sendStatus(204);
	}
	else { //disable voting after vote goes through
		if (votesRemaining == 1) {
			let upvoteresult = await gallery.upvotePost(req.body.picID, sid, "local");
		}
		let localPosts = await local.getPostsByLocation(user.profile.local)
        let local_post = []
        for (let i = 0; i < localPosts.length; i++){
            let post = await gallery.getPostById(localPosts[i]._id);
            local_post.push(post)
        }
		let data = {
            title: "FEED",
			location: "local: " + user.profile.local,
			username: user.profile.username,
			visible: true,
            formLabel: `Upload a Picture to submit! Topic: ${local.getTopic()}`,
            posts: local_post,
            disabled: true
        }
		res.render("feed", data);
	}
});

module.exports = router;