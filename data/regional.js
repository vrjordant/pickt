const mongoCollections = require("../config/mongoCollections");
const regional = mongoCollections.regional;
const users = require("./users");
const gallery = require("./gallery");
const locationData = require("./location");
const nationalFunctions = require("./national");
const uuid = require("node-uuid");

const exportedMethods = {
  async getPostsByLocation(location){
    const regionalCollection = await regional();
    var posts = await regionalCollection.find({location: location}).toArray();
    console.log(posts[0])
    return posts;
  },
  async getRegionalById(id) {
    const regionalCollection = await regional();
    const regionalPost = await regionalCollection.findOne({ _id: id });

    if (!regionalPost) throw "Post not found";
    return regionalPost;
  },
  async addRegionalPost( topic, pid, userId) {
      //Create ID?
    if (typeof topic !== "string") throw "No topic provided";
    if (typeof pid !== "string") throw "No pid provided";
    if (typeof userId !== "string") throw "No userId provided";


    const regionalCollection = await regional();

    const userThatPosted = await users.getUserById(userId);
    const galleryThatPosted = await gallery.getPostById(pid);
    const newRegional = {
    _id: pid,
    creator : {
      name : userThatPosted.profile.name,
      Username : userThatPosted.profile.username,
        _id : userThatPosted._id
    },
    votes : 0,
    topic : topic,
    location : userThatPosted.profile.region
    };

    const newInsertInformation = await regionalCollection.insertOne(newRegional);
    const newId = newInsertInformation.insertedId;
    return await this.getRegionalById(newId);
  },
  async removePostRegional(id) {
    const regionalCollection = await regional();
    const deletionInfo = await regionalCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
  },
  async upvotePostRegional(id) {
    area = "regional";
    const updatedVotes = await gallery.upvotePost(id, area);
    return updatedVotes;
  },
  async moveUp() {
    let regionArray = locationData.getRegionList();
    let allRegionWinners = [];
    //iterates through regions, northeast, southeast, etc
    for(let i = 0; i < regionArray.length; i++){
        let regionalPosts = await this.getPostsByLocation(regionArray[i]);
        //goes through the region and selects the highest vote posts
        let eachRegionWinners = [];
        let max = -1;
        for(let j = 0; j < regionalPosts.length; j++){
          let currentVote = regionalPosts[j].votes;
          if (currentVote > max) {
              max = currentVote;
              eachRegionWinners = [];
              eachRegionWinners.push(regionalPosts[j]._id);
          }
          else if (currentVote == max) {
              eachRegionWinners.push(regionalPosts[j]._id);
          }
        }
        allRegionWinners.push(eachRegionWinners);
      }
      //goes through all region winners and adds them to national
    for(let i = 0; i < allRegionWinners.length; i++){
      for(let j = 0; j < allRegionWinners[i].length; j++){
        let regionPost = await this.getRegionalById(allRegionWinners[i][j]);
        await nationalFunctions.addNationalPost(regionPost.topic, regionPost._id, regionPost.creator._id );
      }
    }
    const regionalCollection = await regional();
    await regionalCollection.deleteMany({});

  }
};

module.exports = exportedMethods;
