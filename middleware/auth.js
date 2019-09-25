const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "no hay token, ruta denegada" });
  }

  try {
    const decodificado = jwt.verify(token, config.get("jwtSecreto"));

    req.usuario = decodificado.usuario;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "el token no es valido" });
  }
};
