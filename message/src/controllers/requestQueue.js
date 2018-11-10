const uuidv1 = require("uuid/v1");
const Queue = require("bull");
const debug = require("debug")("debug:requestQueue");
const requestsQueue = new Queue("MessageRequests", "redis://127.0.0.1:6379");
//const requestsQueue = new Queue("MessageRequests", "redis://redis:6379");
const saveMessage = require("../clients/saveMessage");

module.exports = (req, res) => {
  const httpbody = req.body;
  httpbody.requestID = uuidv1();
  debug("algo")
  saveMessage(
    {
      ...httpbody,
      status: "PENDING"
    },
    function(_result, error) {
      if (error) {
        console.log(error);
      }
    }
  );
  requestsQueue
    .add(httpbody)
    .then(job => {
      debug("created a job: ", job);
      res
        .status(200)
        .send(
          `Request received. Check the status at: http://--/messages/${httpbody.requestID}/status`
        );
    })
    .catch(e => {
      console.log(e);
    });
};
