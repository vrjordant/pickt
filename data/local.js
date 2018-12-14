const mongoCollections = require("../config/mongoCollections");
const local = mongoCollections.local;
const users = require("./users");
const gallery = require("./gallery");
const locationData = require("./location");
const stateFunctions = require("./state");
const uuid = require("node-uuid");

let topic = "Dogs";

const exportedMethods = {
  setTopic(top) {
    topic = top;
  },
  getTopic() {
    return topic;
  },
  async getPostsByLocation(location){
    const localCollection = await local();
    var posts = await localCollection.find({location: location}).toArray();
    console.log(posts[0])
    return posts;
  },
  async getLocalById(id) {
    const localCollection = await local();
    const localPost = await localCollection.findOne({ _id: id });

    if (!localPost) throw "Post not found";
    return localPost;
  },
  async addLocalPost(pid, userId) {
      //Create ID?
    if (typeof topic !== "string") throw "No topic provided";
    if (typeof pid !== "string") throw "No pid provided";
    if (typeof userId !== "string") throw "No userId provided";


    const localCollection = await local();

    const userThatPosted = await users.getUserById(userId);
    const newLocal = {
    _id: pid,
    creator : {
        name : userThatPosted.profile.name,
        Username : userThatPosted.profile.username,
        _id : userThatPosted._id
    },
    votes : 0,
    topic : topic,
    location : userThatPosted.profile.local,
    };

    const newInsertInformation = await localCollection.insertOne(newLocal);
    const newId = newInsertInformation.insertedId;
    return await this.getLocalById(newId);
  },
  async removePostLocal(id) {
    const localCollection = await local();
    const deletionInfo = await localCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
  },
  async upvotePostLocal(id) {
    area = "local";
    const updatedVotes = await gallery.upvotePost(id, area);
    return updatedVotes;
  },
  async moveUp() {
    let stateArray = locationData.getStates();
    let countiesObject = locationData.getCounties();
    for (let i = 0; i < stateArray.length; i++) {
      let countiesArray = countiesObject[stateArray[i]];
      let allCountyWinners = [];
      // going through each county in a given state
      for (let j = 0; j < countiesArray.length; j++) {
        let localPosts = await this.getPostsByLocation(countiesArray[j]);
        let max = -1;
        let eachCountyWinners = [];
        //comparing votes for each county
        for (let k = 0; k < localPosts.length; k++) {
          let currentVote = localPosts[k].votes;
          if (currentVote > max) {
            max = currentVote;
            eachCountyWinners = [];
            eachCountyWinners.push(localPosts[k]._id);
          }
          else if (currentVote == max) {
            eachCountyWinners.push(localPosts[k]._id);
          }
        }
        allCountyWinners.push(eachCountyWinners);
      }
      for (let i = 0; i < allCountyWinners.length; i++) {
        for (let j = 0; j < allCountyWinners[i].length; j++) {
          let localPost = await this.getLocalById(allCountyWinners[i][j]);
          await stateFunctions.addStatePost(localPost.topic,localPost._id,localPost.creator._id);
        }
      }
    }
    await mongoCollections.local.deleteMany();
  }

};

module.exports = exportedMethods;
