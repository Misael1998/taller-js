const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const config = require("config");

const Usuario = require("../../modelos/Usuario");

//@route    /api/auth
//@desc     /autenticacion de usuario
//@access   /publico
router.get(
  "/",
  [
    check("correo", "correo es requerido").isEmail(),
    check("contrasenia", "constrasenia con minimo 6 caracteres requeridos")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { correo, contrasenia } = req.body;
    try {
      const usuario = await Usuario.findOne({ correo: correo });
      if (!usuario) {
        return res.status(400).send("credenciales invalidas");
      }

      const esAcierto = bcrypt.compare(contrasenia, usuario.contrasenia);

      if (!esAcierto) {
        return res.status(400).send("credenciales invalidas");
      }

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
