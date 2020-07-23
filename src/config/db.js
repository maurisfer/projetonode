const mongoose = require('mongoose'); // Importa o módulo moongose para configurar o db

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}); // Configura o caminho do banco de dados que será usado

module.exports = mongoose; // Exporta a configuração do db para o Model
