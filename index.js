const express = require("express");
const app = express();
import { INTERNAL_LINKS } from "./constant";
import { userRoute, consentRoute } from "./routes";
const { db } = require("./config");
import morgan from "morgan";
import bodyParser from "body-parser";

// app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 1000000,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(INTERNAL_LINKS.USER.BASE_URL, userRoute);
app.use(INTERNAL_LINKS.CONSENT.BASE_URL, consentRoute);

db.connection
  .authenticate()
  .then(() => console.log("connected to database successfully..."))
  .catch((error) => console.log(error.message));

app.listen(3000, () => {
  console.log("server started....");
});
