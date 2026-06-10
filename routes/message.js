const { Router } = require("express");
const { addMessage } = require("../models/update");

const messageRouter = Router();

messageRouter.post("/", async (req, res) => {
  if (req.isAuthenticated()) {
    await addMessage(req.body.message, req.user.username, req.body.title);
    res.redirect("/");
  } else {
    res.redirect("/sign-in");
  }
});

module.exports = { messageRouter };
