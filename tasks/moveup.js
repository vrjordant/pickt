const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const local = data.local;

const main = async () => {
//   const jordan = await users.addUser("vrjordant", "Jordan Tantuico", "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK", "Union County", "New Jersey", "East Coast");
//   console.log(jordan);
//   console.log("Done seeding database");
//   const user = await users.getUserByUn("vrjordant");
//   console.log(user);

  // await local.addLocalPost("dogs", "de638062-aa85-4a56-b41f-3ef23e19a9de", "fc314b22-9144-4359-9e78-a2d97108f72b")
  // // console.log(jordan);
  // console.log("Done seeding database");
  // const post = await local.getLocalById("de638062-aa85-4a56-b41f-3ef23e19a9de")
  // console.log(post);
  const db = await dbConnection();
  await local.moveUp();
  await db.serverConfig.close();
};

main().catch(console.log);
