const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const fs = require("fs");
const uuid = require("uuid/v4");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const users = data.users;
const gallery = data.gallery;
const local = data.local;
const moveUp = require("../tasks/moveup");

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

const main = async () => {
  const db = await dbConnection();
  // db.local.drop();
  // db.regional.drop();
  // db.state.drop();
  // db.users.drop();
  // db.gallery.drop();

  let un1 = "chillip";
  let un2 = "polandgod";
  let un3 = "vrjordant";
  let un4 = "gabgabs";
  let un5 = "shillip";

  let name1 = "Phillip Cho";
  let name2 = "David Kim";
  let name3 = "Jordan Tantuico";
  let name4 = "Gabriella Padriga";
  let name5 = "Sean Hill";

  let pw = "1224";
  let hash = await bcrypt.hash(pw, saltRounds);

  const phil = await users.addUser(un1, name1, hash, "Bergen County", "New Jersey", "Northeast");
  const david = await users.addUser(un2, name2, hash, "Garfield County", "Washington", "West");
  const jordan = await users.addUser(un3, name3, hash, "Union County", "New Jersey", "Northeast");
  const gabby = await users.addUser(un4, name4, hash, "Adams County", "Washington", "West");
  const sean = await users.addUser(un5, name5, hash, "Union County", "New Jersey", "Northeast");
  
  hash = await bcrypt.hash('1', saltRounds);
  const admin = await users.addUser("admin", "admin",hash , "admin", "admin", "admin");
  
  let base64 = base64_encode('./uploads/1.jpg');
  let pic = await gallery.addPost(base64, '12-14-2018 09:09:09',phil._id);
  await local.addLocalPost(pic._id, phil._id);

  base64 = base64_encode("./uploads/2.jpg");
  pic = await gallery.addPost(base64, '12-12-2018 10:10:10',david._id);
  await local.addLocalPost(pic._id, david._id);

  base64 = base64_encode("./uploads/3.jpg");
  pic = await gallery.addPost(base64, '12-08-2018 11:12:08',jordan._id);
  await local.addLocalPost(pic._id, jordan._id);

  base64 = base64_encode("./uploads/4.jpg");
  pic = await gallery.addPost(base64, '12-18-2018 08:10:00',gabby._id);
  await local.addLocalPost(pic._id, gabby._id);

  base64 = base64_encode("./uploads/5.jpg");
  pic = await gallery.addPost(base64, '12-09-2018 03:08:03',sean._id);

  await local.addLocalPost(pic._id, sean._id);
  await moveUp.moveAllUp();

  await db.serverConfig.close();

  // await local.addLocalPost("dogs", "de638062-aa85-4a56-b41f-3ef23e19a9de", "fc314b22-9144-4359-9e78-a2d97108f72b")
  // // console.log(jordan);
  // console.log("Done seeding database");
  // const post = await local.getLocalById("de638062-aa85-4a56-b41f-3ef23e19a9de")
  // console.log(post);
  // await db.serverConfig.close();
};

main().catch(console.log);
