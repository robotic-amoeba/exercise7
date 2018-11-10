const Message = require("../models/message");
const saveMessageTransaction = require("../transactions/saveMessage");

module.exports = function(messageParams, cb) {
  console.log("save message params: ", messageParams);
  saveMessageTransaction(messageParams, (undefined, error) => {
    console.log(error);
  });
  return message;
};
