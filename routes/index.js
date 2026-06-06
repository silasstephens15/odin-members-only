const { Router } = require("express");
const { getMessages } = require("../models/query");

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

module.exports = { indexRouter };
