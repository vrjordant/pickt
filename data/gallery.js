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
  async upvotePost(id,area) {
    if (!area) throw "No area provided!";

    const postCollection = await gallery();
    const post = await postCollection.getPostById(id);

    const updatedPostData = {};
    if (area == "local") {
      updatedPostData.vote_local = post.vote_local+1;
    }
    if (area == "state") {
      updatedPostData.vote_state = post.vote_state+1;
    }
    if (area == "regional") {
      updatedPostData.vote_regional = post.vote_regional+1;
    }
    if (area == "national") {
      updatedPostData.vote_national = post.vote_national+1;
    }

    let updateCommand = {
      $set: updatedPostData
    };
    const query = {
      _id: id
    };
    await postCollection.updateOne(query, updateCommand);

    return await this.getPostById(id);
  }
};

module.exports = exportedMethods;
