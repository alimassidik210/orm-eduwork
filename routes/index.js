const routes = require("express").Router();

routes.use("/user", require("./user.route"));
routes.use("/product", require("./product.route"));

module.exports = routes;
