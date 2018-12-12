const express = require('express');
const router = express.Router();
const users = require("../data/users");

router.get("/", async (req, res) => {
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
			title: "feed"
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



/**
 * Convert an image 
 * to a base64 url
 * @param  {String}   url         
 * @param  {Function} callback    
 * @param  {String}   [outputFormat=image/png]           
 */
// function convertImgToBase64URL(url, callback, outputFormat){
	function convertImgToBase64URL(url, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'), dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        // callback(dataURL);
        canvas = null; 
    };
	img.src = url;
	return dataURL;
}


function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
	var dataURL = canvas.toDataURL("image/png");
	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  



router.post("/", async (req, res) => {
	console.log("Hello");
	try {
		console.log("Start");
		// let test = req.body.pic;
		// res.render(feed,{LabelForm: "Upload Completed!"});
		// var testy = convertImgToBase64URL(test,'image');
		// var testy2 = getBase64Image(test);
		// console.log(test);
		// console.log(testy);
		console.log("End");
	}
	catch (e) {
		console.log(e);
	}
});

module.exports = router;