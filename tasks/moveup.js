const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const local = data.local;
const state = data.state;
const regional = data.regional;
const national = data.national;

const main = async () => {
  const db = await dbConnection();
  await local.moveUp();
  await state.moveUp();
  await regional.moveUp();
  await national.selectWinner();
  await db.serverConfig.close();
};

main().catch(console.log);
