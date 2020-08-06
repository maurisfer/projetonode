const mongoose = require('../../config/db'); // Importa o arquivo de configuração do banco de dados

const ChocolateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image:{
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Chocolate = mongoose.model('Chocolate', ChocolateSchema);
module.exports = Chocolate; // Exporta o modelo
