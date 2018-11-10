const uuidv1 = require("uuid/v1");
const Queue = require("bull");
const MessageRequests = new Queue("MessageRequests", "redis://127.0.0.1:6379");

module.exports = (req, res) => {
  const httpbody = req.body;
  httpbody.requestID = uuidv1();
  MessageRequests.add( httpbody )
    .then(job => {      
      res
        .status(200)
        .send(
          `Message processed. Check the status of your message using: /messages/${httpbody.requestID}/status`
        );
      
    })
    .catch((e)=>{console.log(e)});
};