const messageRouter = require("express").Router();
const messageController = require("../controllers/message.controller");

messageRouter.route("/read")
  .post(messageController.getMessage);

messageRouter.route("/send")
  .post(messageController.sendMessage);

module.exports = messageRouter;