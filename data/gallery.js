const mongoCollections = require("../config/mongoCollections");
const gallery = mongoCollections.gallery;
const users = require("./users");
const uuid = require("node-uuid");

const exportedMethods = {
  async getAllPosts() {
    const postCollection = await gallery();
    return await postCollection.find({}).toArray();
  },
  async getPostById(pid) {
    const galleryCollection = await gallery();
    const galleryd = await galleryCollection.findOne({ _id: pid });

    if (!galleryd) throw "Post not found";
    return galleryd;
  },
  async getPostsByUser(cid) {
    if (!cid) throw "No tag provided";

    const galleryCollection = await gallery();
    return await galleryCollection.find({ _cid: cid }).toArray();
  },
  async addPost(data, date, cid) {
    if (!data) throw "No data provided!";
    if (!date) throw "No date provided!";
    if (!cid) throw "No cid provided!";

    const galleryCollection = await gallery();

    // const userThatPosted = await users.getUserById(cid);

    const newPost = {
      _id: uuid.v4(),
      data: data,
      dateCreated: date,
      vote_local: 0,
      vote_state: 0,
      vote_regional: 0,
      vote_national: 0,
      _cid: cid
    };

    const newInsertInformation = await galleryCollection.insertOne(newPost);
    const newId = newInsertInformation.insertedId;
    console.log("we have the new id");
    return await this.getPostById(newId);
  },
  async removePost(id) {
    const postCollection = await gallery();
    const deletionInfo = await postCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
  },

  async upvotePost(pid, sid, area) {
    if (!area) throw "No area provided!";

    let updatedPostData = {};
    let updatedUserData = {};

    let post = await this.getPostById(pid);
    let user = await users.getUserBySession(sid);

    console.log(user);

    if (area == "local") {
      updatedPostData.vote_local = post.vote_local+1;
      updatedUserData.vote_local = user.vote_local - 1;
    }
    else if (area == "state") {
      updatedPostData.vote_state = post.vote_state+1;
      updatedUserData.vote_state = user.vote_state - 1;
    }
    else if (area == "region") {
      updatedPostData.vote_regional = post.vote_regional+1;
      updatedUserData.vote_regional = user.vote_regional - 1;
    }
    else if (area == "national") {
      updatedPostData.vote_national = post.vote_national+1;
      UpdatedUserData.vote_national = user.vote_national - 1;
    }
    else {
      throw "Valid area not provided to upvotePost()";
    }
    const postCollection = await gallery();
    await postCollection.updateOne( {_id: pid}, {$set: updatedPostData});
    await users.updateUser(user._id, updatedUserData);

    return await this.getPostById(pid);
  }
};

module.exports = exportedMethods;
