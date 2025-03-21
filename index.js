require("rootpath")();
const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cors = require("cors");

const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/db");

dotenv.config();

app.use(
  express.json()
);

app.use(cors());
app.enable("trust proxy");



// api routes
app.use(require('./controllers/user.controller'))
app.use('/category',require('./controllers/category.controller'))
app.use('/menu',require('./controllers/menu.controller'))
app.use('/profile',require('./controllers/profile.controller'))





app.use("/static", express.static(path.join(__dirname, "public")));

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.PORT ;


app.get("/", async (req, res) => {
  res.send({
    message: "Hello world",
  });
});
connectDB()
app.listen(port, () => console.log("Server listening on port " + port));
