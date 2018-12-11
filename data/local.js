const mongoCollections = require("../config/mongoCollections");
const local = mongoCollections.local;
const users = require("./users");
const gallery = require("./gallery");
const uuid = require("node-uuid");

const exportedMethods = {
//   async getAllPosts() {
//     const postCollection = await posts();
//     return await postCollection.find({}).toArray();
//   },
  async getPostsByTag(tag) {
    if (!tag) throw "No tag provided";

    const postCollection = await posts();
    return await postCollection.find({ tags: tag }).toArray();
  },
  async getLocalById(id) {
    const localCollection = await local();
    const localPost = await localCollection.findOne({ _id: id });

    if (!localPost) throw "Post not found";
    return localPost;
  },
  async addLocal(_id, creator, votes, topic, location, pid, userId, galleryId) {
      //Create ID?
    if (typeof title !== "object") throw "No title provided";
    if (typeof body !== "string") throw "No votes provided";
    if (typeof topic !== "string") throw "No topic provided";
    if (typeof location !== "string") throw "No location provided";
    if (typeof body !== "string") throw "No votes provided";

    // if (!Array.isArray(tags)) {
    //   tags = [];
    // }

    const localCollection = await local();

    const userThatPosted = await users.getUserById(userId);
    const galleryThatPosted = await gallery.getGalleryById(galleryId);
    const newLocal = {
    _id: uuid.v4(),
    creator : {
        name : userThatPosted.name,
        Username : userThatPosted.Username,
        _id : userThatPosted._id
    },
    votes : votes,
    topic : topic,
    location : userThatPosted.profile.local,
    };

    const newInsertInformation = await localCollection.insertOne(newLocal);
    const newId = newInsertInformation.insertedId;
    return await this.getPostById(newId);
  },
  async removePost(id) {
    const localCollection = await local();
    const deletionInfo = await localCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
  },
  async upvotePost(id, area) {
    const updatedVotes = await gallery.upvotePost(id, area);
    return await updatedVotes;
  }

};

module.exports = exportedMethods;
