const http = require("http");
const saveMessage = require("./saveMessage");
const debug = require("debug")("debug:sendMessage");
const retryPolicy = require("./retryPolicy");
const random = n => Math.floor(Math.random() * Math.floor(n));

module.exports = function(messageReq) {
  //CHECK IF PAYED
  const message = {
    destination: messageReq.destination,
    body: messageReq.body
  };
  console.log("---------------------_", message)
  const messageToSend = JSON.stringify(message);

  if (true || (messageReq.status = "PAYED")) {
    const postOptions = {
      // host: "exercise6_messageapp_1",
      //host: "messageapp",
      host: "localhost",
      port: 3000,
      path: "/message",
      method: "post",
      json: true,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(messageToSend)
      }
    };

    let postReq = http.request(postOptions);

    debug("HTTP request send: ", postOptions);

    postReq.on("response", postRes => {
      if (postRes.statusCode === 200) {
        debug("Success sending the message");
        messageReq.status = "OK";
        saveMessage(messageReq);
      } else {
        debug("Error while sending message");
        messageReq.status = "ERROR";
        saveMessage(messageReq);
        retryPolicy(message);
      }
    });

    postReq.setTimeout(random(6000));

    postReq.on("timeout", () => {
      debug("Timeout Exceeded!");
      postReq.abort();
      messageReq.status = "TIMEOUT";
      saveMessage(messageReq);
      retryPolicy(message);
    });

    postReq.on("error", () => {
      debug("Error in HTTP request");
      messageReq.status = "ERROR";
      saveMessage(messageReq);
      retryPolicy(message);
    });

    postReq.write(body);
    postReq.end();
  }
};
