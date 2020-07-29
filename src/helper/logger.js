const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
//Formata através da biblioteca winston a geração de logs personalizados de forma prática, com formato de data e hra, cores que distinguam as requisições e ainda permite a exportação do módulo para uso em todas as partes da aplicação.
