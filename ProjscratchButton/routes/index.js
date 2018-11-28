const path = require("path");

const constructorMethod = app => {
  app.use("/", (req,res) => {
		res.render("upload/upload");
	});
  app.use("*", (req,res) => {
		res.redirect("/");
	});
};

module.exports = constructorMethod;
