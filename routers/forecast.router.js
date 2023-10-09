const { Router } = require("express");
const { searchForecast } = require("../controllers/forecast.controllers");

const router = Router();

router.route('/').get(searchForecast);

module.exports = router;