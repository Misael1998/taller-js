const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const config = require("config");

const Usuario = require("../../modelos/Usuario");

//@route    /api/usuario
//@desc     /ruta de usuario
//@access   /publico
router.post(
  "/",
  [
    check("nombre", "nombre es requerido")
      .not()
      .isEmpty(),
    check("correo", "correo es requerido").isEmail(),
    check(
      "contrasenia",
      "constrasenia con minimo 6 caracteres requeridos"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, correo, contrasenia } = req.body;
    try {
      let usuario = await Usuario.findOne({ correo: correo });
      if (usuario) {
        return res.status(400).send("el usuario ya existe");
      }

      usuario = new Usuario({ nombre, correo, contrasenia });

      const salt = await bcrypt.genSalt(10);

      usuario.contrasenia = await bcrypt.hash(contrasenia, salt);

      await usuario.save();

      const payload = {
        usuario: {
          id: usuario.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecreto"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("error de servidor");
    }
  }
);

module.exports = router;
