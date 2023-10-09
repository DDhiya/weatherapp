const express = require("express");
const { router } = require("./routers");
const path = require("path");
const { PORT } = require("./config/secrets");

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(__dirname + '/public'));

app.use("/", router);

app.listen(PORT, () => {
    console.log("Express server is running");
})