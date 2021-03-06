const routes = require('express').Router(); // Define que o arquivo routes usará a função ROUTER()
const multer = require('multer');
const userController = require('./app/controllers/UserController'); // Importa o controller
const chocolateController = require('./app/controllers/ChocolateController');
const validatorMid = require('./app/middlewares/validators');
const jwtMid = require('./app/middlewares/jwt');
const multerConfig = require('./config/multer');

//  Rotas para usuários

routes.post('/login', userController.auth);
routes.post('/users', validatorMid.userCreateValidator, userController.store); // Importa do controller as funções da classe e os verbos HTTP e os middlewares

//  routes.use(jwtMid); Implantação global da validação de token

routes.get('/users', userController.index); // Importa do controller as funções da classe e os verbos HTTP
routes.get('/users/:id', userController.show); // Importa do controller as funções da classe e os verbos HTTP
routes.put(
  '/users/:id',
  validatorMid.userUpdateValidator,
  userController.update
); // Altera os dados solicitados na requisição (exceto a senha, fazer endpoint e regras de negócio diferenciadas para "esqueci minha senha" e somente para "alteração de senha");
routes.delete('/users/:id', userController.destroy); // Importa do controller as funções da classe e os verbos HTTP

/// rotas para chocolate
routes.post(
  '/chocolates',
  multer(multerConfig).single('file'),
  chocolateController.store
);
routes.get('/chocolates', chocolateController.index);
routes.get('/chocolates:id', chocolateController.show);
routes.put('/chocolates:id', chocolateController.update);
routes.delete('/chocolates:id', chocolateController.destroy);

module.exports = routes; // Exporta o arquivo routes para uso no app.js

// Middlewares são validações e funções que executam antes de se chamar o controller, pois estes não são responsabilidade deste. São usados paraa criação de blocos de funcionalidades em separado com o objeto de especificar a organização e facilitar a manutenção e implementação do código dentro do back-end.

// Lembrar que a ordem das linha simporta na leitura do código. No caso o routes.use(jwt) irá ser lido após a login e cadastro que são rotas uue não precisam de token
