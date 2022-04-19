const jwt = require("jsonwebtoken");
import { request, response } from "express";

const authentication = async (request, response, next) => {
  try {
    let jwtToken = null;
    const authHeader = request.headers.authorization;
    if (authHeader != undefined) {
      jwtToken = authHeader.split(" ")[1];
      const verifiedToken = jwt.verify(jwtToken, "MY_SECRET_TOKEN");

      if (verifiedToken) {
        request.currentUser = verifiedToken;
        next();
      }
    } else {
      response
        .status(400)
        .send({ success: false, message: "Authorization should be there!" });
    }
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

export default authentication;
