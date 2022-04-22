export default {
  BASE_API_URL: "api/v1/",

  USER: {
    BASE_URL: "/api/v1/users",
    REGISTER: "/register",
    LOGIN: "/login",
    USER_DETAIL: "/userdetail",
    CHANGE_PASSWORD: "/change-password",
    USERS_LIST: "/",
  },

  CONSENT: {
    BASE_URL: "/api/v1/consents",
    LIST_CONSENTS: "/",
    ADD_CONSENTS: "/giveConsent",
    GROUP_CONSENT: "/groupBy",
    UPDATE_CONSENTS: "/:id",
    DELETE_CONSENTS: "/:id",
    FILE_UPLOAD: "/fromfile",
  },
};
