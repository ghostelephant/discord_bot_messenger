const messageRouter = require("express").Router();
const messageController = require("../controllers/message.controller");

messageRouter.route("/read")
  .post(messageController.getMessage);

messageRouter.route("/send");

module.exports = messageRouter;