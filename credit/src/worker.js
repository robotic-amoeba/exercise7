const Queue = require('bull');
const sendMessage = require("./controllers/sendMessage");
const MessageRequests = new Queue("MessageRequests", "redis://127.0.0.1:6379");

module.exports = MessageRequests.process((job) => {sendMessage(job.data);});
