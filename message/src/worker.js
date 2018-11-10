const Queue = require('bull');
const sendMessage = require("./controllers/sendMessage");
const requestsQueue = new Queue("MessageRequests", "redis://127.0.0.1:6379");

module.exports = requestsQueue.process((job) => {sendMessage(job.data);});
