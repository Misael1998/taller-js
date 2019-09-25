const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../modelos/Post");

//@route    /api/post
//@desc     /ruta para publicar un post
//@access   /privado
router.post(
  "/",
  [
    auth,
    [
      check("titulo", "es necesario el titulo del post")
        .not()
        .isEmpty(),
      check("post", "es necesario el cuerpo del post")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { titulo, post } = req.body;
    const id = req.usuario.id;
    try {
      const postCampos = {
        usuario: id,
        titulo: titulo,
        post: post
      };

      const postEnvuelto = new Post(postCampos);

      await postEnvuelto.save();

      res.json(postEnvuelto);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("error de servidor");
    }
  }
);

module.exports = router;
