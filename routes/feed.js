const express = require('express');
const router = express.Router();
const users = require("../data/users");
var fs = require('fs');

router.get("/", async (req, res) => {
	let topic = "Dog";

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
			FormLabel: `Submit a photo! TOPIC: ${topic}`
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
// function getBase64Image(img) {
// 	var canvas = document.createElement("canvas");
// 	canvas.width = img.width;
// 	canvas.height = img.height;
// 	var ctx = canvas.getContext("2d");
// 	ctx.drawImage(img, 0, 0);
// 	var dataURL = canvas.toDataURL("image/png");
// 	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
//   }
function getBase64Image(img) {
    var bitmap = fs.readFileSync(img);
    return new Buffer(bitmap).toString('base64');
}
  
router.post("/", async(req,res) => {
	try {
		console.log("HAPPENING");
		let test = req.body.pic;
		var base64 = getBase64Image(req.body.pic);
		console.log(base64);
		console.log("ENDING");
		res.render("feed",{FormLabel: "Upload Complete!"});
	}
	catch(e) {
		console.log(e);
	}
});

module.exports = router;