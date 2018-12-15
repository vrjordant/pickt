const data = require("../data/");
const users = data.users;
const local = data.local;
const state = data.state;
const regional = data.regional;
const national = data.national;

module.exports = {
  moveAllUp: async function moveAllUp() {
    winners = await national.selectWinner();
    await regional.moveUp();
    await state.moveUp();
    await local.moveUp();
    console.log(winners);
    let allUsers = await users.getAllUsers();
    console.log("TESTTTTTTTTTTTTTTTTTTTTT");
    // console.log(allUsers);
    for (let i = 0; i < allUsers.length;i++) {
      let resetVotesProfile = {
        vote_local : 5,
        vote_state : 5,
        vote_regional : 5,
        vote_national : 5
      }
 
      users.updateUser(allUsers[i]._id,resetVotesProfile);
    }
  }
}
