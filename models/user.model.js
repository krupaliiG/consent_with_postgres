import { db } from "../config";

const User = db.connection.define("User", {
  username: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

User.sync().then(() => {
  console.log("New USER table created");
});

export default User;
