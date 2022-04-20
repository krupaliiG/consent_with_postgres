import express from "express";
import { INTERNAL_LINKS } from "../constant";
import { userController } from "../controller";
import { authentication } from "../middleware";

export default express
  .Router()
  .post(INTERNAL_LINKS.USER.REGISTER, userController.register)
  .post(INTERNAL_LINKS.USER.LOGIN, userController.login)
  .get(
    INTERNAL_LINKS.USER.USER_DETAIL,
    authentication,
    userController.userDetail
  )
  .put(
    INTERNAL_LINKS.USER.CHANGE_PASSWORD,
    authentication,
    userController.changePassword
  )
  .get(
    INTERNAL_LINKS.USER.USERS_LIST,
    authentication,
    userController.usersList
  );
