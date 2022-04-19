import express from "express";
import { INTERNAL_LINKS } from "../constant";
import { consentController } from "../controller";
import { authentication } from "../middleware";

export default express
  .Router()
  .get(
    INTERNAL_LINKS.CONSENT.LIST_CONSENTS,
    authentication,
    consentController.ListConsents
  )
  .post(
    INTERNAL_LINKS.CONSENT.ADD_CONSENTS,
    authentication,
    consentController.AddConsents
  )
  .put(INTERNAL_LINKS.CONSENT.UPDATE_CONSENTS, consentController.updateConsents)
  .delete(
    INTERNAL_LINKS.CONSENT.DELETE_CONSENTS,
    consentController.deleteConsents
  );
