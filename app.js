const express = require("express");
const bodyParser = require("body-parser");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const userData = require("./data/users.js");
const static = express.static(__dirname + "/css");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use("/css", static);
app.use(express.static('resources'));

app.use(cookieParser());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
configRoutes(app);

app.listen(3000, () => {
  console.log("Your server is now listening on port 3000!");
  console.log("Navigate to http://localhost:3000 to access it.");

  if (process && process.send) process.send({done: true}); // ADD THIS LINE
});
