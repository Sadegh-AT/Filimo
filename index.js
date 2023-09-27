const Application = require("./app/server");
const PersianDate = require("./app/utils/persianDate");

require("dotenv").config();


new Application(process.env.PORT, process.env.DB_URL);
