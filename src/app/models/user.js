const bcrypt = require('bcryptjs');
const mongoose = require('../../config/db'); // Importa o arquivo de configuração do banco de dados

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
); // Configuração dos dados que vão para o banco de dados

UserSchema.pre('save', async (next) => {
  const hashPass = await bcrypt.hash(this.pass, 10);
  this.pass = hashPass;
  next();
}); // pre - Informa que há uma ação antes de salvar o dado. Nesse caso, é salvo a senha criptografada pelo bcrypt

const User = mongoose.model('User', UserSchema); // Cria o modelo a partir da configuração
module.exports = User; // Exporta o modelo
