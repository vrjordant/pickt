const mongoCollections = require("../config/mongoCollections");
const state = mongoCollections.state;
const users = require("./users");
const gallery = require("./gallery");
const locationData = require("./location");
const regionFunctions = require("./regional");
const uuid = require("node-uuid");

const exportedMethods = {
  async getPostsByLocation(location){
    const stateCollection = await state();
    var posts = await stateCollection.find({location: location}).toArray();
    console.log(posts[0])
    return posts;
  },
  async getStateById(id) {
    const stateCollection = await state();
    const statePost = await stateCollection.findOne({ _id: id });

    if (!statePost) throw "Post not found";
    return statePost;
  },
  async addStatePost( topic, pid, userId) {
      //Create ID?
    if (typeof topic !== "string") throw "No topic provided";
    if (typeof pid !== "string") throw "No pid provided";
    if (typeof userId !== "string") throw "No userId provided";

    const stateCollection = await state();

    const userThatPosted = await users.getUserById(userId);
    const newState = {
    _id: pid,
    creator : {
      name : userThatPosted.profile.name,
      Username : userThatPosted.profile.username,
        _id : userThatPosted._id
    },
    votes : 0,
    topic : topic,
    location : userThatPosted.profile.state
    };

    const newInsertInformation = await stateCollection.insertOne(newState);
    const newId = newInsertInformation.insertedId;
    return await this.getStateById(newId);
  },
  async removePostState(id) {
    const stateCollection = await state();
    const deletionInfo = await stateCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
  },
  async upvotePostState(id) {
    area = "state";
    const updatedVotes = await gallery.upvotePost(id, area);
    return updatedVotes;
  },
  async moveUp() {
    let regionList = locationData.getRegionList();
    let regionsObject = locationData.getRegions();
    for (let i = 0; i < regionList.length; i++) {
      let state_list = regionsObject[regionList[i]];
      let allStateWinners = [];
      for (let j = 0; j < state_list.length; j++) {
        let current_state = state_list[j];
        let statePosts = await this.getPostsByLocation(current_state);
        let max = -1;
        let eachStateWinners = [];
        for (let k = 0; k < statePosts.length; k++) {
          let current_vote = statePosts[k].votes;
          if (current_vote > max) {
            max = current_vote;
            eachStateWinners = [];
            eachStateWinners.push(statePosts[k]._id);
          }
          else if (current_vote == max) {
            eachStateWinners.push(statePosts[k]._id);
          }
        }
        allStateWinners.push(eachStateWinners);
      }
      for (let i = 0; i < allStateWinners.length; i++) {
        for (let j = 0; j < allStateWinners[i].length; j++) {
          let statePost = await this.getLocalById(allStateWinners[i][j]);
          await regionFunctions.addStatePost(statePost.topic,statePost._id,statePost.creator._id);
        }
      }
    }
    await mongoCollections.state.deleteMany();
  }

};

module.exports = exportedMethods;
