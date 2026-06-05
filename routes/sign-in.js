const { Router } = require("express");
const passport = require("passport");

const signInRouter = Router();

signInRouter.get("/", (req, res) => {
  res.render("sign-in", { title: "Sign-In", errors: {}, values: {} });
});

signInRouter.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    const errors = {};
    if (err) {
      return next(err);
    }
    if (!user) {
      if (info.message.includes("username")) {
        errors.username = info.message;
      }
      if (info.message.includes("password")) {
        errors.password = info.message;
      }
      return res.render("sign-in", {
        title: "Sign-In",
        errors,
        values: req.body,
      });
    }
    req.logIn(user, () => {
      return res.redirect("/");
    });
  })(req, res, next);
});

module.exports = { signInRouter };
