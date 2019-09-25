const mongoose = require("mongoose");
const config = require("config");
const bd = config.get("mongoURI");

const conectarBD = async () => {
  try {
    await mongoose.connect(bd, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("base de datos conectada");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = conectarBD;
