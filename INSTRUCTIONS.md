# API do Departamento de Polícia

## Como rodar o projeto

1.  Inicie o ambiente com Docker: `docker-compose up -d`
2.  Instale as dependências: `npm install`
3.  Rode as migrations: `npm run knex:migrate`
4.  Rode os seeds: `npm run knex:seed`
5.  Inicie o servidor: `npm start`