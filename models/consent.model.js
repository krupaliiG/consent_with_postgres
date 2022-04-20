import { db } from "../config";

const Consent = db.connection.define("Consent", {
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  consentFor: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  createdBy: {
    type: db.Sequelize.INTEGER,
  },
});

// Consent.sync().then(() => {
//   console.log("New Consent table created!");
// });

export default Consent;
