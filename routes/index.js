const landingRoute = require("./landing");
const loginRoute = require("./login");
const profileRoute = require("./profile");
const logoutRoute = require("./logout");
const feedRoute = require("./feed");
const winnerRoute = require("./winner");
const votingRoute = require("./voting");
const signupRoute = require("./signup");


function constructorMethod(app) {
	app.use("/", landingRoute);
	app.use("/voting", votingRoute);
	app.use("/winner", winnerRoute);
	app.use("/feed", feedRoute);
	app.use("/login", loginRoute);
	app.use("/profile", profileRoute);
	app.use("/logout", logoutRoute);
	app.use("/signup", signupRoute);

	app.use("*", (req, res) => {
    	res.redirect("/");
  	});
}

module.exports = constructorMethod;