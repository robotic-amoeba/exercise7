const Message = require("../models/message");
const debug = require("debug")("debug:updateMessageStatus");

module.exports = function(requestID, status, cb) {
  return Message()
    .findOneAndUpdate({ requestID }, { status }, { new: true })
    .then(message => {
      debug("Updated message status to :", message.status);
    })
    .catch(error => {
      cb(null, error);
    });
};
