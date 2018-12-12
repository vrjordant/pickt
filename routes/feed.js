const express = require('express');
const router = express.Router();
const users = require("../data/users");
const fileupload = require("express-fileupload");
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
router.post("/", function(req, res)
{
    var file;
    if(!req.files) {
        console.log("File not found");
        return;
    }

    file = req.files.FormFieldName;  // here is the field name of the form

    // file.mv("file.txt", function(err){
	// 	// log your error
	// });

    console.log(file);
});
// router.post("/", async (req, res) => {
// 	// assuming <input type="file" name="upload">
// 	try {
// 		console.log("HAPPENING");
// 		var path = req.files.pic.path;
// 		var name = req.files.pic.name;
// 		console.log(`${path} ${name}`);  
// 		// let test = req.body.pic;
// 	// 	image2base64(test) // you can also to use url
//     // 	.then(
//     //     (response) => {
//     //         console.log(response); //cGF0aC90by9maWxlLmpwZw==
//     //     }
//     // )
// 		res.render("feed",{formLabel: "Upload Completed!"});
// 	}
// 	catch (e) {
// 		console.log(e);
// 	}
// });

module.exports = router;