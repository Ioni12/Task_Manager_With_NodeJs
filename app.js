const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
require("./db/mongoose.js");
require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

const taskRoutes = require("./routes/tasks");

app.use(taskRoutes);

app.get("/", (req, res) => {
  res.redirect("/tasks");
});

app.listen(port, () => console.log(`server is up and running in port ${port}`));
