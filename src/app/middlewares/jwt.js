const jwt = require('jsonwebtoken'); //Importa biblioteca de criptgrafia do token
const { promisify } = require('util'); // Importa somente a promisify da biblioteca nativa do node.js para forçar await na jwt.verify
const logger = require('../../helper/logger');

module.exports = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json({ error: 'Não existe um token' });
  }
  const jwtParts = authHeader.split(' '); // Retorna um array

  if (jwtParts.length !== 2) {
    return res.status(401).json({ erro: 'Token com formato inválido' });
  }

  const [scheme, token] = jwtParts; //Desestrturação do array, atribuindo indice 0 a variavel scheme e indice 1 em token

  if (scheme !== 'Bearer') {
    return res.status(401).json({ erro: 'Token com prefixo inválido' });
  }

  try {
    const tokenDecoded = await promisify(jwt.verify)(
      token, //Token recebido do header da requisição
      process.env.JWT_KEY //Variável ambiente que contém a chave para descriptografar o token
    ); //Função de decodigica e compara o token da requisição
    logger.info(tokenDecoded.id); //Extraindo o id do usuário do token
    return next(); //Passa os valores para o controller
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ erro: 'Token com problema' });
  } //retorna o erro caso aconteça.
}; //Faz a validação dos tokens enviados através das requisições do front-end ao back para poder garantir os acessos a quem é devido

//Promisify ajuda a jwt a ser assíncrona para evitar padrão callback que seria lido de forma corrida e não esperaria a execução da decodificação para retornar o valor que necessitams (tokenDecoded)
