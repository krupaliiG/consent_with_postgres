const { parse } = require("csv-parse");

import fs from "fs";
import { resolve } from "dns";

const getData = (filename) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(`./uploads/${filename}`)
      .on("error", (error) => {
        reject(error);
      })
      .pipe(parse({ columns: true }))
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });
};

export default getData;
