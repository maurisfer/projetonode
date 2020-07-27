require('dotenv').config();

const cors = require('cors');
const express = require('express'); // Importa a biblioteca express
require('express-async-errors');
const morgan = require('morgan'); // Mostra métricas de req e res
const helmet = require('helmet');
const routes = require('./routes'); // Importa o arquivo de rotas
const logger = require('./helper/logger'); //Formata os logs com certas propriedades

const app = express(); // Define a função express() para uso mais simples

app.use(helmet()); //Define as mascaras do header das requisições
app.use(cors()); //Permite o uso das middlewares
app.use(express.json()); // Define req e res sempre no formato json
app.use(morgan('dev')); // Configura o morgan com especificidade
app.use(routes); // Define que a API use a rota routes

app.use((error, req, res, next) => {
  logger.error(error);
  return res.status(500).json({ erro: 'Houve um erro na API' });
});

app.listen(process.env.PORT || 3000, () =>
  logger.info(`API 2 OK NA PORTA ${process.env.PORT || 3000}`)
); // Define o escutador do localhost
