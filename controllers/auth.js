const User = require("../models/User");
const crypto = require("crypto");
const {
  userNotFoundResponse,
  userSignedUpResponse,
  userSignedOutResponse,
} = require("../config/responses");
const bcryptjs = require("bcryptjs");
const { errorMessage } = require("../utils/utils");
const accountVerificationEmail = require("../config/accountVerificationEmail");
const jwt = require("jsonwebtoken");

const controller = {
  register: async (req, res, next) => {
    let { name, lastName, role, photo, age, email, password } = req.body;
    let verified = false;
    let logged = false;
    let code = crypto.randomBytes(10).toString("hex");
    password = bcryptjs.hashSync(password, 10);

    try {
      await User.create({
        name,
        lastName,
        role,
        photo,
        age,
        email,
        password,
        verified,
        logged,
        code,
      });
      accountVerificationEmail(email, code);
      return userSignedUpResponse(req, res);
    } catch (error) {
      errorMessage(res, 400, error.message);
    }
  },

  verify: async (req, res, next) => {
    const { code } = req.params;
    try {
      let user = await User.findOneAndUpdate(
        { code },
        { verified: true },
        { new: true }
      );
      if (user) {
        return res.redirect(process.env.FRONT_URL + "/signin");
      } else {
        return userNotFoundResponse(req, res);
      }
    } catch (error) {
      errorMessage(res, 400, error.message);
    }
  },
  signIn: async (req, res, next) => {
    const { password } = req.body;
    const { user } = req;

    try {
      const verifypassword = bcryptjs.compareSync(password, user.password);

      if (verifypassword) {
        const userDataBase = await User.findOneAndUpdate(
          { _id: user.id },
          { logged: true },
          { new: true }
          );
        const token = jwt.sign(
          {
            id: userDataBase._id,
            name: userDataBase.name,
            photo: userDataBase.photo,
            logged: userDataBase.logged,
            role: userDataBase.role,
          },
          process.env.KEY_JWT,
          { expiresIn: 60 * 60 * 24 }
        );

        return res.status(200).json({
          response: { user, token },
          success: true,
          message: "Welcome! You have successfully signed " + user.name,
        });
      }
      return invalidCredentialsResponse(req, res);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  signInWithToken: async (req, res, next) => {
    let { user } = req; //desestructuro
 
    try {
      return res.json({
        //respuesta
        response: { user },
        success: true,
        message: "Welcome " + user.name,
      });
    } catch (error) {
      next(error); //respuesta del catch
    }
  },

  exit: async (req, res, next) => {
    const { id } = req.user;
    try {
      await User.findByIdAndUpdate(id, { logged: false });
      return userSignedOutResponse(req, res);
    } catch (error) {
      errorMessage(res, 400, error.message);
    }
  },

  viewMyProfile: async (req, res) => {
    const { id } = req.params;
    try {
      let user = await User.findById(id);

      if (user) {
        res.status(200).json({
          response: user,
          success: true,
          message: "User Found",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  },

  updateMyprofile: async (req, res) => {
    let { id } = req.params;
    let update = req.body;
    try {
      let updateUser = await User.findByIdAndUpdate(id, update, { new: true, });

      if (updateUser) {
        res.status(200).json({
          response: updateUser,
          sucess: true,
          message: "User Updated",
        });
      } else {
        res.status(404).json({
          sucess: false,
          message: "User Not Found",
        });
      }
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = controller;
