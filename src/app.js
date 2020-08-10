require('dotenv').config(); //  Auxilia na configuração das variaveis ambiente
const cors = require('cors'); //  Configura que as requisições possam vir de outros dispositivos além do insomnia
const express = require('express'); // Importa a biblioteca express para configurar o db
require('express-async-errors'); // Configura a espera do Node pelos erros
const morgan = require('morgan'); // Mostra métricas de req e res
const helmet = require('helmet'); //  Auxilia nas máscaras do header da res
const path = require('path');
const routes = require('./routes'); // Importa o arquivo de rotas
const logger = require('./helper/logger'); // Formata os logs com certas propriedades

const app = express(); // Define a função express() para uso mais simples

app.use(helmet()); // Define as mascaras do header das requisições
app.use(cors()); // Permite o usode qualquer front-end para consumir a API

app.use(express.json()); // Define req e res sempre no formato json
app.use(express.urlencoded({ extended: true }));

app.use(
  '/images',
  express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
);

app.use(morgan('dev')); // Configura o morgan com especificidade
app.use(routes); // Define que a API use a rota routes

app.use((error, req, res, next) => {
  logger.error(error);
  return res.status(500).json({ erro: 'Houve um erro na API' });
}); //  Padroniza a exibição dos erros no log

app.listen(process.env.PORT || 3000, () =>
  logger.info(`API 2 OK NA PORTA ${process.env.PORT || 3000}`)
); // Define o escutador do localhost - process é uma função interna do dotenv
