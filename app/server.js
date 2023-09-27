const morgan = require("morgan");
const { NotFoundError, ErrorHandler } = require("./utils/error-handler");
const { connectToMongo } = require("./utils/monoose.connection");
const express = require("express");
const { AllRoutes } = require("./routers/routes");

const app = express();

class Application {
  constructor(PORT, DB_URL) {
    this.configServer();
    this.configDatabase(DB_URL);
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
  }
  configServer() {
    // process.env.PORT, process.env.DB_URL;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));
  }

  configDatabase(DB_URL) {
    connectToMongo(DB_URL);
  }

  createServer(PORT) {
    app.listen(PORT, () => {
      console.log(`Server Run on Port: ${PORT}`);
    });
  }

  createRoutes() {
    app.get("/", (req, res) => {
      res.json("s");
    });
    app.use(AllRoutes);
  }

  errorHandler() {
    app.use(NotFoundError);
    app.use(ErrorHandler);
  }
}

module.exports = Application;
