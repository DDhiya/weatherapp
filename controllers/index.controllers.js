const getRoot = (req, res) => {
    res.render("index");
}

const getForecast = (req, res) => {
    res.render("forecast");
}

module.exports = {getRoot, getForecast};