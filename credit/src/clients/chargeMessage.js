const updatecredit = require("./chargeMessage");
const updateCreditTransaction = require("../transactions/updateCredit");
const getCredit = require("./getCredit");

module.exports = function() {
  if (getCredit().amount > 0) {
    updateCreditTransaction(
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
          status = "NO CREDIT";
          console.log(error);
          cb(undefined, error);
        }
      }
    )
    .then(()=>{
      const status = "NO CREDIT";
      updateStatus(requestID, status, function(_result, error) {
        console.log(error);
      });

    })
  } else {
    //guardar mensaje con no credito
    //lanzar evento de no credito
    const status = "NO CREDIT";
    updateStatus(requestID, status, function(_result, error) {
      console.log(error);
    });
  }
};
