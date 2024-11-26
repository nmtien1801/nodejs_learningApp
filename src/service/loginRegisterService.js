import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { Op } from "sequelize";
import { reject, resolve } from "bluebird";
require("dotenv").config();

const checkEmailExists = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// hash password
const salt = bcrypt.genSaltSync(10);
const hashPassWord = (userPassWord) => {
  return bcrypt.hashSync(userPassWord, salt);
};

const registerNewUser = async (rawUserData) => {
  try {
    // check email
    let isEmailExists = await checkEmailExists(rawUserData.email);
    if (isEmailExists === true) {
      return {
        EM: "the email is already exists",
        EC: 1,
        DT: "email",
      };
    }

    // hash user password
    let CheckHashPass = hashPassWord(rawUserData.password);
    //create new user
    await db.User.create({
      email: rawUserData.email,
      userName: rawUserData.userName,
      password: CheckHashPass,
    });

    // không bị lỗi
    return {
      EM: "A user is create successfully",
      EC: 0,
    };
  } catch (error) {
    console.log("check Err create new user Register: ", error);
    return {
      EM: "something wrong in service ...",
      EC: -2,
    };
  }
};

const checkPassword = (userPassWord, hashPassWord) => {
  return bcrypt.compareSync(userPassWord, hashPassWord); // true or false
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        email: rawData.email,
      },
      raw: true,
    });
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      console.log("user login: ", user);
      // không bị lỗi
      if (isCorrectPassword === true) {
        return {
          EM: "Login successfully",
          EC: 0,
          DT: {
            _id: user.id, // dùng để lấy user flow | student của user này
            // groupWithRole: groupWithRole,
            email: user.email,
            userName: user.userName,
            description: user.description,
            phone: user.phone,
            address: user.address,
            title: user.title,
            image: user.image,
            role: user.roleID,
          },
        };
      }
    }
    return {
      EM: "your email | phone or password is incorrect",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(">>>>check Err Login user: ", error);
    return {
      EM: "something wrong in service ...",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  hashPassWord,
  checkEmailExists,
};
