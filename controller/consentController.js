import { getData } from "../utils";
import { db } from "../config";
const models = db.connection.models;

const ListConsents = async (request, response) => {
  try {
    const data = await models.consent.findAll();
    response.status(200).send({ success: true, data });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const AddConsents = async (request, response) => {
  try {
    const { email, consent_for } = request.body;
    const { id } = request.currentUser;

    const data = await models.consent.create({
      email,
      consentFor: consent_for,
      createdBy: id,
    });

    response
      .status(200)
      .send({ success: true, message: "Consent added successfully!" });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const GroupConsents = async (request, response) => {
  try {
    const data = await models.consent.findAll({
      attributes: [
        [db.Sequelize.fn("DISTINCT", db.Sequelize.col(`date`)), "date"],
        [
          db.Sequelize.literal(
            `(select jsonb_agg(cs) FROM "consents" as cs where cs."date" = consent."date")`
          ),
          "data",
        ],
      ],
      raw: true,
    });

    // postgres raw query
    //     SELECT distinct DATE("createdAt") AS date,
    // (select jsonb_agg(cs) from "Consents" as cs where DATE(cs."createdAt") = DATE(c."createdAt"))
    // FROM "Consents" as c;

    response.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const updateConsents = async (request, response) => {
  try {
    const { id } = request.params;
    const { consent_for, email } = request.body;

    await models.consent.update(
      { consentFor: consent_for },
      {
        where: {
          email: email,
        },
      }
    );
    response.status(200).send({
      success: true,
      message: `Consent with id ${id} updated successfully!`,
    });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const deleteConsents = async (request, response) => {
  try {
    const { id } = request.params;

    await models.consent.destroy({
      where: {
        id,
      },
    });
    response.status(200).send({
      success: true,
      message: `Consent with id ${id} deleted successfully!`,
    });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const fileUpload = async (request, response) => {
  try {
    const { originalname } = request.file;
    const { id } = request.currentUser;

    const data = await getData(originalname);
    const validateData = data.map((eachdata) => {
      eachdata = { ...eachdata, createdBy: id };
      return eachdata;
    });
    await models.consent.bulkCreate(validateData);

    response.status(200).send({
      success: true,
      message: `All the Data of file uploaded successfully.`,
    });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

export default {
  ListConsents,
  AddConsents,
  GroupConsents,
  updateConsents,
  deleteConsents,
  fileUpload,
};
