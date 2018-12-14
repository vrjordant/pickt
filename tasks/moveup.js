const data = require("../data/");
const users = data.users;
const local = data.local;
const state = data.state;
const regional = data.regional;
const national = data.national;

module.exports = {
  moveAllUp: async function moveAllUp() {
    winners = await national.selectWinner();
    await local.moveUp();
    await state.moveUp();
    await regional.moveUp();
    console.log(winners);
    let allUsers = await users.getAllUsers();
    for (let i = 0; i < allUsers.length;i++) {
      allUsers[i].vote_local = 5;
      allUsers[i].vote_state = 5;
      allUsers[i].vote_regional = 5;
      allUsers[i].vote_national = 5;
    }
  }
}
