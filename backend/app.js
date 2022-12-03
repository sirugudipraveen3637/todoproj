require("dotenv").config();
require("./config/db");
const express = require("express");
const app = express();
const cookieparser=require("cookie-parser")
const todoRouter = require("./routes/todorouter");
const userRouter = require("./routes/userrouter");

app.use(express.json());
app.use(cookieparser())
app.use(express.urlencoded({ extended: true }));

app.use("/", todoRouter);
app.use("/", userRouter);

module.exports = app;

