const { Router } = require("express");

const indexRouter = require("./index.router");
const forecastRouter = require("./forecast.router");

const router = Router();

router.use("/", indexRouter);
router.use("/forecast", forecastRouter);

module.exports = { router };