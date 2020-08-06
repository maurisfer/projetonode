const chocolateModel = require('../models/chocolates'); // Importa o Model para o Controller

class ChocolateController {
  // POST - Criar chocolate
  async store(req, res) {
    const chocolate = await chocolateModel.create(req.body); // Cria os dados dentro do banco de dados e aguarda o processamento do req.body de modo assincrono.
    return res.status(201).json({ chocolate });
  }

  // DELETE com id - Deletar chocolate
  async destroy(req, res) {
    const { id } = req.params; // Puxa a informação através da url /users/:id
    await chocolateModel.findOneAndDelete(id); // Procura a informação pelo id e deleta
    return res.status(200).json({ msg: 'Chocolate deletado com sucesso' }); // Responde com mensagem de deleção bem sucedidada
  }

  // PUT - Atualizar dados do chocolate
  async update(req, res) {
    const { id } = req.params;
    const chocolate = await chocolateModel.findOneAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ chocolate }); // Retorna os dados atualizados para a resposta
  }

  // GET com ID - Listar 1 Chocolate
  async show(req, res) {
    const { id } = req.params; // Puxa a informação através da url /users/:id
    const oneChocolate = await chocolateModel.findById(id); // Procura a informação pelo id
    return res.status(200).json({ oneChocolate }); // Responde com o dado solicitado atrvés do id do req.params
  }

  // GET - Todos os Chocolates
  async index(req, res) {
    const allChocolate = await chocolateModel.find(); // Procura todos os dados no DB
    return res.status(200).json({ allChocolate }); // Responde com os dados solicitados
  }

} // Cria as regras de negócio que serão enviadas para o routes

module.exports = new ChocolateController(); // Exporta a classe criada para routes, usa-se o new para que se possa usar fora do arquivo de definição.
