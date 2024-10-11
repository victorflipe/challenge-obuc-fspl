# Task Management API

Este projeto é uma API RESTful desenvolvida em Node.js para gerenciamento de tarefas, utilizando o framework Express.js, Sequelize como ORM e PostgreSQL como banco de dados.

## Requisitos

- Node.js v21.6.1
- Docker e Docker Compose
- PostgreSQL

## Configuração do Ambiente

Certifique-se de configurar as variáveis de ambiente no arquivo `.env` antes de iniciar o projeto. As variáveis necessárias são:

```
NODE_ENV=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
```

## Instalação e Uso

### 1. Instale as Dependências

```sh
npm install
```

### 2. Configure as Variáveis de Ambiente

Crie um arquivo `.env` com as variáveis descritas anteriormente.

### 3. Execute as Migrações do Banco de Dados

```sh
npm run migrate
```

### 4. Inicie o Servidor

Para iniciar em modo de desenvolvimento:

```sh
npm run dev
```

Para iniciar em modo de produção:

```sh
npm start
```

### 5. Executando com Docker Compose

O projeto inclui um arquivo `docker-compose.yml` que configura um container PostgreSQL para desenvolvimento. Para executar o PostgreSQL usando Docker Compose, utilize o seguinte comando:

```sh
docker-compose up -d
```

Isso iniciará o container `postgresdb` com a imagem do PostgreSQL.

## Scripts Disponíveis

- **dev**: Inicia o servidor em modo de desenvolvimento usando `nodemon`.
- **start**: Inicia o servidor em modo de produção.
- **migrate**: Executa as migrações do banco de dados.
- **migration:generate**: Gera uma nova migração para o banco de dados.
- **migration:undo**: Desfaz a última migração.

## Dependências

- **express**
- **sequelize**
- **pg**
- **pg-hstore**
- **dotenv**

### Dependências de Desenvolvimento

- **nodemon**
- **sequelize-cli**

## Docker Compose

O projeto inclui um arquivo `docker-compose.yml` para facilitar a configuração do ambiente de desenvolvimento.

```yaml
version: '3.8'

services:
  postgresdb:
    image: postgres
    restart: 'always'
    expose:
      - '5432'
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_PASSWORD=password
```

Este serviço cria um container PostgreSQL para o ambiente de desenvolvimento, facilitando o teste e o uso da aplicação.