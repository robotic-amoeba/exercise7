const uuidv1 = require("uuid/v1");
const Queue = require("bull");
const requestsQueue = new Queue("MessageRequests", "redis://127.0.0.1:6379");
//const requestsQueue = new Queue("MessageRequests", "redis://redis:6379");

module.exports = (req, res) => {
  const httpbody = req.body;
  httpbody.requestID = uuidv1();
  requestsQueue.add( httpbody )
    .then(job => {      
      res
        .status(200)
        .send(
          `Request received. Check the status at: http://--/messages/${httpbody.requestID}/status`
        );
      
    })
    .catch((e)=>{console.log(e)});
};