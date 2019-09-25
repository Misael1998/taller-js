const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    require: true
  },
  contrasenia: {
    type: String,
    required: true
  }
});

module.exports = Usuario = mongoose.model("usuario", UsuarioSchema);
