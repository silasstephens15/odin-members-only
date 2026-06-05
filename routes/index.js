const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Home", user: req.user });
});

module.exports = { indexRouter };
