export default (connection, DataTypes) => {
  return connection.define("consent", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consentFor: {
      type: DataTypes.STRING,

      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  });
};
