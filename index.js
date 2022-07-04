const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { connect } = require("mongoose");
const consola = require("consola");

const { DB, PORT } = require("./config");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/clients", require("./routes/client"));

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      consola.success({ message: `server started on ${PORT}`, badge: true });
    });
  } catch (err) {
    consola.error({
      message: "********Unable to start server*******",
      badge: true,
    });
    console.error(err);
  }
};

const connectDB = async () => {
  try {
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    consola.success({ message: "********DB CONNECTED*******", badge: true });
  } catch (err) {
    consola.error({
      message: "********DB CONNECTION FAILED*******",
      badge: true,
    });
    console.error(err);
  }
};

start();
