const express = require("express");
const session = require("express-session");
const path = require("node:path");
const { indexRouter } = require("./routes");
const { signUpRouter } = require("./routes/sign-up");
const { signInRouter } = require("./routes/sign-in");
const { pool } = require("./models/pool");
const passport = require("passport");
require("./config/passport");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 100 },
  }),
);
app.use(passport.session());
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000);
