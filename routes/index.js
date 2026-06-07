const { Router } = require("express");
const { getMessages } = require("../models/query");
const { deleteMessage } = require("../models/update");

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  try {
    const messages = await getMessages();
    res.render("index", { title: "Home", user: req.user, messages });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

indexRouter.delete("/:time&:title", async (req, res, next) => {
  try {
    await deleteMessage(req.params.title, req.params.time);
    res.json({ redirect: "/" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = { indexRouter };
