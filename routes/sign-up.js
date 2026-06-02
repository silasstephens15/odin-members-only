const { Router } = require("express");

const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
  res.render("sign-up", { title: "Sign-Up" });
});

module.exports = { signUpRouter };
