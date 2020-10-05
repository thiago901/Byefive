# Orientação
  - Execute o comando yarn ou npm install
  - Atualize o arquivo .env com a informação do seu ambiente de Banco de dados
  - Não há rota de logout, pois é gerado um Token que se expira em 1 dia.
  - Da forma que a API desenvolvida é necessario enviar um bearer token para toda requisição que tem a necessidade de ser autenticada

# Comandos
  - yarn dev : Roda projeto
  - yarn test : roda os teste e gera/atualiza o coverage

# Rotas
  - [POST] /sessions : Ao passar email e senha é devolvido uma token de autencação
  - [POST] /users : Ao passar nome, email e senha é realizado o cadastro do usuario
  - [PUT] /users : Ao passar nome, email e senha antiga e nova senha é realizado a atualização do usuario
  - [GET] /users : Lista todos os usuarios exceto quem solicitou a listagem
  - [GET] /users/:id : Retorna um usuario com o Id expecificado
  - [DELETE] /users/:id :Deleta um usuario com um Id expecifico
  - [GET] /search : Recebe name e email no query params e retornar usuarios que batem com o as palavras chave


# Tecnologias
  - TypeScript
  - DDD
  - SOLID
  - Injeção de Dependeicias (tsyringe)
  - Teste Unitatios (jest)
  - Express
  - Mongo com Mongoose
  - Eslint e Prettier
  


