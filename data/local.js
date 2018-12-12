const mongoCollections = require("../config/mongoCollections");
const local = mongoCollections.local;
const users = require("./users");
const gallery = require("./gallery");
const uuid = require("node-uuid");

const exportedMethods = {
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
  async addLocalPost( topic, pid, userId) {
      //Create ID?
    if (typeof topic !== "string") throw "No topic provided";
    if (typeof pid !== "string") throw "No pid provided";
    if (typeof userId !== "string") throw "No userId provided";


    const localCollection = await local();

    const userThatPosted = await users.getUserById(userId);
    const newLocal = {
    _id: pid,
    creator : {
        name : userThatPosted.name,
        Username : userThatPosted.Username,
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
  }

};

module.exports = exportedMethods;
