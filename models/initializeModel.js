const DataTypes = require("sequelize").DataTypes;
import { _userModel, _consentModel } from "./index";

export default (connection) => {
  const userModel = _userModel(connection, DataTypes);
  const consentModel = _consentModel(connection, DataTypes);

  userModel.hasMany(consentModel, {
    as: "consentByUser",
    foreignKey: "createdBy",
  });

  return { userModel, consentModel };
};
