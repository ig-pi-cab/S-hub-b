const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const passport = require("passport");
require("./middlewares/googleStrategy"); // 🔁 Requiere e inicializa la estrategia

app.use(passport.initialize());

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true               // habilita cookies/autenticación
}));
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    console.log("Body:", req.body);
  }
  next();
});


app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
