import { request, response } from "express";
import { consentModel } from "../models";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";

const ListConsents = async (request, response) => {
  try {
    const { email = "", id = null, by = null } = request.query;

    const data = await consentModel.findAll({
      //   where: Sequelize.or({ email }, { id }, { createdBy: by }),
      attributes: ["email"],
      group: "createdBy",
    });
    response.status(200).send(data);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const AddConsents = async (request, response) => {
  try {
    const { email, consent_for } = request.body;
    const { id } = request.currentUser;

    const data = await consentModel.create({
      email,
      consentFor: consent_for,
      createdBy: id,
    });

    response.status(200).send("Consent added successfully!");
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const updateConsents = async (request, response) => {
  try {
    const { id } = request.params;
    const { consent_for, email } = request.body;

    await consentModel.update(
      { consentFor: consent_for },
      {
        where: {
          email: email,
        },
      }
    );
    console.log(id);
    response.status(200).send(`Consent with id ${id} updated successfully!`);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const deleteConsents = async (request, response) => {
  try {
    const { id } = request.params;

    await consentModel.destroy({
      where: {
        id,
      },
    });
    response.status(200).send(`Consent with id ${id} deleted successfully!`);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

export default { ListConsents, AddConsents, updateConsents, deleteConsents };
