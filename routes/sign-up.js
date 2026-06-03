const { Router } = require("express");

const signUpRouter = Router();

function validateInput(req, errors) {
  Object.keys(req.body).map((key) => {
    if (req.body[key].length >= 64) {
      errors[key] = "Length too long";
    }
    if (req.body["full-name"].split(" ").length <= 1) {
      errors["full-name"] = "Enter first and last name separated by spaces";
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
    res.redirect("/");
  } else {
    const values = req.body;
    res.status(422).render("sign-up", { title: "Sign-Up", errors, values });
  }
});

module.exports = { signUpRouter };
