import { userModel, consentModel } from "./index";

function initializeModels() {
  userModel.hasMany(consentModel, {
    as: "consentByUser",
    foreignKey: "createdBy",
  });

  return userModel, consentModel;
}

export default initializeModels;
