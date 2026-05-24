# EcoTrack API

## Descrição da solução

O EcoTrack é uma solução voltada para consumidores que desejam consultar informações nutricionais e ambientais de produtos.

Nesta entrega de DevOps, foi implementado o módulo de cadastro e consulta de produtos e categorias, utilizando uma API REST com persistência em banco de dados em nuvem.

A solução permite realizar operações CRUD de produtos e categorias, mantendo relacionamento entre as tabelas `produtos` e `categorias`.

## Tecnologias utilizadas

- Node.js
- Express
- SQL Server em nuvem
- Azure DevOps Pipelines
- Azure App Service
- GitHub

## Estrutura do projeto

```text
ecotrack-api/
│
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   │   ├── categorias.routes.js
│   │   └── produtos.routes.js
│   ├── controllers/
│   │   ├── categorias.controller.js
│   │   └── produtos.controller.js
│   └── database/
│       └── connection.js
│
├── scripts/
│   ├── create_tables.sql
│   └── seed_data.sql
│
├── requests/
│   ├── categorias.json
│   ├── produtos-create.json
│   ├── produtos-update.json
│   └── produtos-delete.json
│
├── tests/
│   └── api.test.js
│
├── azure-pipelines.yml
├── package.json
├── README.md
└── .env.example