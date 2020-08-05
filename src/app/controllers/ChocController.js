const ChocModel = require('../models/chocolates'); // Importa o Model para o Controller


class ChocController {
  // POST - Criar chocolate
  async store(req, res) {
    const user = await ChocModel.create(req.body); // Cria os dados dentro do banco de dados e aguarda o processamento do req.body de modo assincrono.
    return res.status(201).json({ user });
  }

  // DELETE com id - Deletar chocolate
  async destroy(req, res) {
    const { id } = req.params; // Puxa a informação através da url /users/:id
    await ChocModel.findOneAndDelete(id); // Procura a informação pelo id e deleta
    return res.status(200).json({ msg: 'Usuário deletado com sucesso' }); // Responde com mensagem de deleção bem sucedidada
  }

  // PUT - Atualizar dados do chocolate
  async update(req, res) {
    const { id } = req.params;
    const user = await ChocModel.findOneAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ user }); // Retorna os dados atualizados para a resposta
  }

  // GET com ID - Listar 1 Chocolate
  async show(req, res) {
    const { id } = req.params; // Puxa a informação através da url /users/:id
    const oneChocolate = await ChocModel.findById(id); // Procura a informação pelo id
    return res.status(200).json({ oneChocolate }); // Responde com o dado solicitado atrvés do id do req.params
  }

  // GET - Todos os Chocolates
  async index(req, res) {
    const allChocolate = await ChocModel.find(); // Procura todos os dados no DB
    return res.status(200).json({ allChocolate }); // Responde com os dados solicitados
  }

} // Cria as regras de negócio que serão enviadas para o routes

module.exports = new ChocController(); // Exporta a classe criada para routes, usa-se o new para que se possa usar fora do arquivo de definição.
