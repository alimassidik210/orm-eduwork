const { users } = require("../models");
const bcrypt = require("../utils/bcrypt");

module.exports = {
  async getAllUsers(req, res, next) {
    try {
      const usersRow = await users.findAll({
        attributes: ["id", "username", "email"],
      });
      return res.status(200).json({
        error: false,
        massage: "success",
        data: usersRow,
      });
    } catch (error) {
      next(error);
    }
  },

  async addNewUsers(req, res, next) {
    try {
      const { username, email, password } = req.body;
      // validation :
      const exist = await users.findOne({
        where: {
          email,
        },
        select: ["id"],
      });
      if (exist) throw { code: 400, massage: "email already registered" };
      const hashedPassword = await bcrypt.hashPassword(password);
      await users.create({
        username,
        email,
        password: hashedPassword,
      });
      return res.status(201).json({
        error: false,
        massage: "success added",
      });
    } catch (error) {
      next(error);
    }
  },

  async getUser(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const user = await users.findOne({
        where: {
          id: id,
        },
        attributes: ["id", "username", "email"],
      });
      if (!user) throw { code: 404, massage: "user not found" };
      return res.status(200).json({
        error: false,
        massage: "succes",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // update
  async updateUser(req, res, next) {
    try {
      const { username, email } = req.body;
      const id = parseInt(req.params.id);
      const user = await users.findOne({
        where: {
          id: id,
        },
        attributes: ["id", "username", "email"],
      });
      if (!user) throw { code: 404, massage: "user not found" };
      await user.update({
        username,
        email,
      });
      return res.status(201).json({
        error: false,
        massage: "user updated",
      });
    } catch (error) {
      next(error);
    }
  },

  // delete
  async deleteUser(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const user = await users.findOne({
        where: {
          id: id,
        },
        attributes: ["id", "username", "email"],
      });
      if (!user) throw { code: 404, massage: "user not found" };
      await users.destroy({
        where: { id },
      });
      return res.status(201).json({
        error: false,
        massge: "user deleted",
      });
    } catch (error) {
      next(error);
    }
  },
};
