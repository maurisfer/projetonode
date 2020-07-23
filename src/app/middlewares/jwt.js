const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // Importa somente a promisify da biblioteca nativa do node.js para forçar await na jwt.verify
const logger = require('../../helper/logger');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Não existe um token' });
  }
  const jwtParts = authorization.split(' '); // Retorna um array

  if (jwtParts.length !== 2) {
    return res.status(401).json({ erro: 'Token com formato inválido' });
  }

  const [scheme, token] = jwtParts;

  if (scheme !== 'Bearer') {
    return res.status(401).json({ erro: 'Token com prefixo inválido' });
  }

  try {
    const tokenDecoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    logger.info(tokenDecoded.id);
    return next();
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ erro: 'Token com problema' });
  }
};
