import { userModel, consentModel } from "../models";
import { request, response } from "express";
const jwt = require("jsonwebtoken");

const register = async (request, response) => {
  try {
    const { username, email, password } = request.body;

    const validateEmail = await userModel.findAll({
      where: {
        email: email,
      },
    });
    if (validateEmail.length) throw new Error("Email already exists!");

    const data = await userModel.create({
      username,
      email,
      password,
    });

    response.status(200).send("Registration successfull!");
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const validateData = await userModel.findOne({
      where: {
        email: email,
        password: password,
      },
      raw: true,
    });

    if (!validateData) throw new Error("Invalid credentials!");
    const payload = { id: validateData.id, email: email };
    const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
    response.status(200).send({ success: true, token: jwtToken });
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const userDetail = async (request, response) => {
  try {
    const { id } = request.currentUser;
    // const userDetail = await userModel.findOne({
    //   where: { id: id },
    //   raw: true,
    // });

    // const consentByUser = await consentModel.findAll({
    //   where: {
    //     createdBy: id,
    //   },
    // });

    const consentByUser = await userModel.findOne({
      where: {
        id: id,
      },
      include: {
        model: consentModel,
        as: "consentByUser",
      },
    });

    console.log("consentByUser", consentByUser);

    response.status(200).send({
      success: true,
      consentGivenByUser: consentByUser,
    });
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const changePassword = async (request, response) => {
  try {
    const { password } = request.body;
    const { id } = request.currentUser;

    await userModel.update({ password }, { where: { id } });

    response
      .status(200)
      .send({ success: true, message: "Your Password changed successfully!" });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const usersList = async (request, response) => {
  try {
    const { id } = request.currentUser;

    const usersList = await userModel.findAll();
    response.status(200).send({ success: true, usersList: usersList });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

export default { register, login, userDetail, changePassword, usersList };
