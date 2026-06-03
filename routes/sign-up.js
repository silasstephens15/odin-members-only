const { Router } = require("express");
const { addUser } = require("../models/update");

const signUpRouter = Router();

function validateInput(req, errors) {
  Object.keys(req.body).map((key) => {
    if (req.body[key].length >= 64) {
      errors[key] = "Length too long";
    }
    if (req.body.member == "true") {
      if (req.body["member-password"] != process.env.MEMBER_PASSWORD) {
        errors["member-password"] = "Incorrect Password";
      }
    }
    if (req.body["full-name"].split(" ").length <= 1) {
      errors["full-name"] = "Enter first and last name separated by spaces";
    } else {
      req.body.name = [
        req.body["full-name"].split(" ")[0],
        req.body["full-name"].split(" ")[
          req.body["full-name"].split(" ").length - 1
        ],
      ];
    }
  });
  return errors;
}

signUpRouter.get("/", (req, res) => {
  res.render("sign-up", { title: "Sign-Up", errors: {}, values: {} });
});
signUpRouter.post("/", (req, res) => {
  const errors = {};
  validateInput(req, errors);
  if (Object.keys(errors).length === 0) {
    addUser(
      req.body.username,
      req.body.name,
      req.body.password,
      req.body.member,
      req.body.admin,
    ).then(() => {
      res.redirect("/");
    });
  } else {
    const { name, ...values } = req.body;
    res.status(422).render("sign-up", { title: "Sign-Up", errors, values });
  }
});

module.exports = { signUpRouter };
