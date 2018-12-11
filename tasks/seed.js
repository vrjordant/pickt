const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();
  const jordan = await users.addUser("vrjordant", "Jordan Tantuico", "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK", "Union County", "New Jersey", "East Coast");
  // console.log(jordan);
  console.log("Done seeding database");
  const user = await users.getUserByUn("vrjordant");
  console.log(user);
  await db.serverConfig.close();
};

main().catch(console.log);
