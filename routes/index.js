const express = require("express");
const router = express.Router();

const mainRouter = require("./main.route");

router.use("/products", mainRouter);

module.exports = router;
