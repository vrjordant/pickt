const landingRoute = require("./landing");
const loginRoute = require("./login");
const privateRoute = require("./private");
const logoutRoute = require("./logout");
const feedRoute = require("./feed");
const winnerRoute = require("./winner");
const votingRoute = require("./voting");


function constructorMethod(app) {
	app.use("/", landingRoute);
	app.use("/voting", votingRoute);
	app.use("/winner", winnerRoute);
	app.use("/feed", feedRoute);
	app.use("/login", loginRoute);
	app.use("/private", privateRoute);
	app.use("/logout", logoutRoute);

	app.use("*", (req, res) => {
    	res.redirect("/");
  	});
}

module.exports = constructorMethod;