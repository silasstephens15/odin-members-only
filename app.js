const express = require("express");
const path = require("node:path");
const { indexRouter } = require("./routes");
const { signUpRouter } = require("./routes/sign-up");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);

app.listen(3000);
