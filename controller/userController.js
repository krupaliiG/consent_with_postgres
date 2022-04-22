import { db } from "../config";
const jwt = require("jsonwebtoken");
const models = db.connection.models;

const register = async (request, response) => {
  try {
    const { username, email, password } = request.body;

    const validateEmail = await models.user.findAll({
      where: {
        email: email,
      },
    });
    if (validateEmail.length) throw new Error("Email already exists!");

    const data = await models.user.create({
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

    const validateData = await models.user.findOne({
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
    const consentByUser = await models.user.findOne({
      where: {
        id: id,
      },
      include: {
        model: consentModel,
        as: "consentByUser",
      },
    });

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

    await models.user.update({ password }, { where: { id } });

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

    const usersList = await models.user.findAll();
    response.status(200).send({ success: true, usersList: usersList });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

export default { register, login, userDetail, changePassword, usersList };
