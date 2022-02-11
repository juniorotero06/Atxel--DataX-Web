const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
require("dotenv").config();

const authRoutes = require("./routes/auth");
const dasboardRoutes = require("./routes/dashboard");
const verifyToken = require("./middleware/validate-token");

const app = express();
require("./database-config");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "authorization",
    ],
  })
);

app.use("/api/dashboard", verifyToken, dasboardRoutes);
app.use("/api/user", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor andando en ${PORT}`);
});
