require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // 👈 CLAVE

const postresRoutes = require("./routes/postres");
app.use("/api/postres", postresRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});