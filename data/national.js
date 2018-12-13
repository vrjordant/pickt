const mongoCollections = require("../config/mongoCollections");
const national = mongoCollections.national;
const users = require("./users");
const gallery = require("./gallery");
const uuid = require("node-uuid");

const exportedMethods = {
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
    const galleryThatPosted = await gallery.getGalleryById(pid);
    const newNationalPost = {
    _id: uuid.v4(),
    creator : {
        name : userThatPosted.profile.name,
        Username : userThatPosted.profile.username,
        _id : userThatPosted._id
    },
    votes : 0,
    topic : topic,
    location : userThatPosted.profile.national,
    pid : pid
    };

    const newInsertInformation = await natoinalCollection.insertOne(newNationalPost);
    const newId = newInsertInformation.insertedId;
    return await this.getPostById(newId);
  },
  async removePostNational(id) {
    const nationalCollection = await national();
    const deletionInfo = await nationalCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
  },
  async upvotePost(id) {
    area = "national";
    const updatedVotes = await gallery.upvotePost(id, area);
    return updatedVotes;
  }

};

module.exports = exportedMethods;
