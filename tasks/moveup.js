const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const local = data.local;
const state = data.state;
const regional = data.regional;
const national = data.national;

module.exports = {
  moveAllUp: async function moveAllUp() {
    const db = await dbConnection();
    await local.moveUp();
    await state.moveUp();
    await regional.moveUp();
    winners = await national.selectWinner();
    console.log(winners);
    await db.serverConfig.close();
  }
}
