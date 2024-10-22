const express = require('express');
const { sequelize } = require('./models');
const { routes } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use('/', routes);

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
});
