const userData = require("./users");
const galleryData = require("./gallery");
const localData = require("./local");
//const stateData = require("./state");
//const regionalData = require("./regional");
//const nationalData = require("./national");

module.exports = {
  users: userData,
  gallery: galleryData,
  local: localData/*,
  state: stateData,
  regional: regionalData,
  national: nationalData*/
};
