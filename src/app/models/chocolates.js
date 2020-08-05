const ChocSchema = mongoose.Schema(
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

const Chocolate = mongoose.model('Chocolate', ChocSchema);
module.exports = Chocolate; // Exporta o modelo
