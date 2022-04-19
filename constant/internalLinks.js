export default {
  BASE_API_URL: "api/v1/",

  USER: {
    BASE_URL: "/api/v1/users",
    REGISTER: "/register",
    LOGIN: "/login",
  },

  CONSENT: {
    BASE_URL: "/api/v1/consents",
    LIST_CONSENTS: "/",
    ADD_CONSENTS: "/giveConsent",
    UPDATE_CONSENTS: "/:id",
    DELETE_CONSENTS: "/:id",
  },
};
