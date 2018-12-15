const mongoCollections = require("../config/mongoCollections");
const national = mongoCollections.national;
const users = require("./users");
const gallery = require("./gallery");
const uuid = require("node-uuid");

const exportedMethods = {
  async getAllNationalPosts() {
    const nationalCollection = await national();
    const nationalPosts = await nationalCollection.find({}).toArray();
    return nationalPosts;
  },
  async getNationalById(id) {
    const nationalCollection = await national();
    const nationalPost = await nationalCollection.findOne({ _id: id });

    if (!nationalPost) throw "National post not found";
    return nationalPost;
  },
  async addNationalPost( topic, pid, userId) {
      //Create ID?
    if (typeof topic !== "string") throw "No topic provided";
    if (typeof pid !== "string") throw "No pid provided";
    if (typeof userId !== "string") throw "No userId provided";


    const nationalCollection = await national();

    const userThatPosted = await users.getUserById(userId);
    const newNationalPost = {
    _id: pid,
    creator : {
        name : userThatPosted.profile.name,
        Username : userThatPosted.profile.username,
        _id : userThatPosted._id
    },
    votes : 0,
    topic : topic
    };

    const newInsertInformation = await nationalCollection.insertOne(newNationalPost);
    const newId = newInsertInformation.insertedId;
    return await this.getNationalById(newId);
  },
  async removePostNational(id) {
    const nationalCollection = await national();
    const deletionInfo = await nationalCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
  },
  async upvotePostNational(id) {
    const nationalPost = await this.getNationalById(id);
      let numOfVotes = nationalPost.votes + 1;
      const nationalCollection = await national();
      let newPostObject = {};
      newPostObject.votes = numOfVotes;
      await nationalCollection.updateOne({_id : id}, {$set: newPostObject});
  },
  async selectWinner(){
    let nationalPosts = await this.getAllNationalPosts();
    let max = -1;
    let winnerPostsArray = [];
    for(let x = 0; x < nationalPosts.length; x++){
      let currPostVotes = nationalPosts[x].votes;
      if(currPostVotes > max){
        max = currPostVotes;
        winnerPostsArray = [];
        winnerPostsArray.push(nationalPosts[x]._id);
      }
      if(currPostVotes = max){
        winnerPostsArray.push(nationalPosts[x]._id);
      }
    }
    for(let x = 0; x < winnerPostsArray.length; x++){
      let nationalPostId = winnerPostsArray[x];
      let nationPostWinner = await this.getNationalById(nationalPostId);
      let userId = nationPostWinner.creator._id;
      let userProfileThatWon = await users.getUserById(userId);
      let newWins = userProfileThatWon.victories + 1;
      let newUserObject = {
        victories: newWins
      }

      newUserInfo = await users.updateUser(userId, newUserObject);
      console.log("test");
      console.log(newUserInfo);
    }

    const nationalCollection = await national();
    await nationalCollection.deleteMany({});
    return winnerPostsArray;
  }

};

module.exports = exportedMethods;
