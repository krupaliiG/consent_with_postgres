import express from "express";
import { INTERNAL_LINKS } from "../constant";
import { userController } from "../controller";

export default express
  .Router()
  .post(INTERNAL_LINKS.USER.REGISTER, userController.register)
  .post(INTERNAL_LINKS.USER.LOGIN, userController.login);
