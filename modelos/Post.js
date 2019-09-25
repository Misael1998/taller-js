const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "usuario"
  },
  titulo: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
