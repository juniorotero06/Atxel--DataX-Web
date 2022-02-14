const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
require("dotenv").config();

const authRoutes = require("./routes/auth");
const Routes = require("./routes/routes");
const verifyToken = require("./middleware/validate-token");

const app = express();
require("./database-config");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

var corsOptions = {
  origin: '*', 
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));


app.use("/api/auth", authRoutes);
app.use("/api", verifyToken, Routes);

app.listen(PORT, () => {
  console.log(`Servidor andando en ${PORT}`);
});
