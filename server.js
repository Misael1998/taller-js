const express = require("express");
const conectarBD = require("./config/db");

const server = express();

conectarBD();

server.use(express.json({ extended: false }));
server.use("/api/usuario", require("./api/rutas/usuario"));
server.use("/api/auth", require("./api/rutas/auth"));
server.use("/api/post", require("./api/rutas/post"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`servidor iniciado en el puerto ${PORT}`)
);
