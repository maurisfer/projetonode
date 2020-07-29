const yup = require('yup'); //Importa a biblioteca de gerenciamento de geração de máscaras

class Validators {
  async userCreateValidator(req, res, next) {
    const userMask = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      pass: yup.string().required(),
    }); // Cria as máscaras de validação na criação do usuário

    const userValidate = await userMask.isValid(req.body, { strict: true });

    if (!userValidate) return res.status(400).json({ msg: 'Dados incorretos' });

    return next(); // Encaminha a validação para o controller
  }

  async userUpdateValidator(req, res, next) {
    const updateMask = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
    }); // Cria as máscaras de validação na atualização do usuário

    const updateValidate = await updateMask.isValid(req.body, { strict: true });

    if (!updateValidate)
      return res.status(400).json({ msg: 'Dados incorretos' });

    return next();
  }
}

module.exports = new Validators();
