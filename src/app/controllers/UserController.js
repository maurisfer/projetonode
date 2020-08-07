const bcrypt = require('bcryptjs'); //  Importa a biblioteca de criptografia
const jwt = require('jsonwebtoken'); // mporta a biblioteca de geração de tokens
const UserModel = require('../models/user'); // Importa o Model para o Controller

class UserController {
  // POST - Criar usuário
  async store(req, res) {
    const user = await UserModel.create(req.body); // Cria os dados dentro do banco de dados e aguarda o processamento do req.body de modo assincrono.

    user.pass = undefined; // Oculta a senha da requisão e da resposta;

    return res.status(201).json({ user });
  }

  // DELETE com id - Deletar usuário
  async destroy(req, res) {
    const { id } = req.params; // Puxa a informação através da url /users/:id

    await UserModel.findOneAndDelete(id); // Procura a informação pelo id e deleta

    return res.status(200).json({ msg: 'Usuário deletado com sucesso' }); // Responde com mensagem de deleção bem sucedidada
  }

  // PUT - Atualizar dados do usuário
  async update(req, res) {
    const { id } = req.params;

    const user = await UserModel.findOneAndUpdate(id, req.body, { new: true });

    delete req.body.pass; // Difere do user.pass = undefined; Porque exclui o paramêtro pass da requisição e não corre o perigo de alterar a senha errado no bd.

    return res.status(200).json({ user }); // Retorna os dados atualizados para a resposta
  }

  // GET com ID - Listar 1 usuáro
  async show(req, res) {
    const { id } = req.params; // Puxa a informação através da url /users/:id

    const oneUser = await UserModel.findById(id); // Procura a informação pelo id

    return res.status(200).json({ oneUser }); // Responde com o dado solicitado atrvés do id do req.params
  }

  // GET - Todos os usuários
  async index(req, res) {
    const allUsers = await UserModel.find(); // Procura todos os dados no DB

    return res.status(200).json({ allUsers }); // Responde com os dados solicitados
  }

  // POST - Validação de login e senha
  async auth(req, res) {
    const { email, pass } = req.body; // Recupera as informações do body

    const user = await UserModel.findOne({ email }); // Filtra o usuário pelo e-mail mas retorna todos os dados do json do cadastro
    // user.pass = undefined; Pode ocultar a senha do retorno
    if (!user) return res.status(400).json('Credencias inválidas'); // If inline

    const correctUser = await bcrypt.compare(pass, user.pass); // Puxa dos dos dados a senha e compara com a senha digitada de login agravés do compare do bcrypt

    if (!correctUser)
      return res.status(401).json({ msg: 'Credenciais inválidas' }); // If inline

    const { _id: id } = user; // Puxa o id

    const token = jwt.sign({ id }, process.env.JWT_KEY, {
      expiresIn: '1d',
    }); // Usa a biblioteca jwt para criar token de validação com o id do usuário e as informações vindas do header criptografadas pela senha process.env.JWT_KEY

    return res.json({ token });
  }
} // Cria as regras de negócio que serão enviadas para o routes

module.exports = new UserController(); // Exporta a classe criada para routes, usa-se o new para que se possa usar fora do arquivo de definição.
