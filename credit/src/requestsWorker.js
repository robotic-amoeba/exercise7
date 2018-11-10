const Queue = require("bull");
//const chargeMessage = require("./controllers/chargeMessage");
const requestsQueue = new Queue("MessageRequests", "redis://127.0.0.1:6379");
//const requestsQueue = new Queue("MessageRequests", "redis://redis:6379");

module.exports = requestsQueue.process(job => {
  console.log("message received: ", job.data)
  //chargeMessage(job.data);
});
