const updatecredit = require("../clients/chargeMessage");

module.exports = updateCreditTransaction(
  {
    amount: { $gte: 1 },
    location: message.location.name
  },
  {
    $inc: { amount: -message.location.cost }
  },
  function(doc, error) {
    if (error) {
      return cb(undefined, error);
    } else if (doc == undefined) {
      let error = "Not enough credit";
      messageParams.status = "NO CREDIT";
      console.log(error);
      cb(undefined, error);
    }
  }
);
