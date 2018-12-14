const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//criar Schema

const UsuarioSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

//criar o modelo

mongoose.model("usuarios", UsuarioSchema);
