const route = require("express").Router();

const {
  getAllUsers,
  getUser,
  addNewUsers,
  updateUser,
  deleteUser,
} = require("../controlers/user_contoler");

route.get("/", getAllUsers);
route.get("/:id", getUser);
route.post("/", addNewUsers);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);

module.exports = route;
