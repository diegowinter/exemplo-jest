const fs = require('fs');
const { nanoid } = require('nanoid');
const usersData = require('../data/users.json');

exports.post = (req, res, next) => {
  // Dados recebidos na URL
  const nome = req.query.nome;
  const idade = req.query.idade;

  // Valida os dados a serem inseridos
  if (nome.length < 3) {
    res.status(400).send({'mensagem': 'O nome deve ter pelo menos 3 caracteres.'});
    return;
  }
  if (isNaN(idade)) {
    res.status(400).send({'mensagem': 'A idade deve ser um número.'});
    return;
  }

  // Adiciona o novo usuário no JSON
  const novoUsuario = {
    'id': nanoid(),
    'nome': nome,
    'idade': idade,
  };
  usersData.push(novoUsuario);
  fs.writeFileSync('src/data/users.json', JSON.stringify(usersData));

  // Envia a resposta
  res.status(201).send(novoUsuario);
};

exports.get = (req, res, next) => {
  // Envia a resposta com todos os usuários
  res.status(200).send(usersData);
}

exports.delete = (req, res, next) => {
  // ID do usuário recebido na URL
  const id = req.params.id;

  // Busca o usuário pelo ID fornecido na requisição
  // const resultados = usersData.filter((user) => user.id == id);
  const resultadoIndex = usersData.findIndex((user) => user.id == id);

  // Valida se o usuário existe
  if (resultadoIndex == -1) {
    res.status(404).send({'mensagem': 'O usuário a ser deletado não existe.'});
    return;
  }

  // Remove o usuário
  usersData.splice(resultadoIndex, 1);
  fs.writeFileSync('src/data/users.json', JSON.stringify(usersData));

  // Envia a resposta
  res.status(200).send({'mensagem': 'Usuário deletado.'});
};