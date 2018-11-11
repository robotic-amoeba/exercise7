const Message = require("../models/message");
const saveMessageTransaction = require("../transactions/saveMessage");
const debug = require("debug")("debug:saveMessage");

module.exports = function(messageParams, cb) {
  debug("save message params: ", messageParams);
  return saveMessageTransaction(messageParams, (undefined, error) => {
    console.log(error);
  });

};