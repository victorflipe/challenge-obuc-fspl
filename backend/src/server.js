const express = require('express');
const { sequelize } = require('./models');
const { routes } = require('./routes');
const cors = require('cors');
const fs = require("fs")
const path = require("path")

const app = express();
const PORT = process.env.PORT || 3333;

const corsOptions = {
  origin: process.env.HOSTNAME_FRONTEND, 
  optionsSuccessStatus: 200
};

// function authentication(req, res, next) {
//   const authheader = req.headers.authorization;
//   console.log(req.headers);

//   if (!authheader) {
//       let err = new Error('You are not authenticated!');
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status = 401;
//       return next(err)
//   }

//   const auth = new Buffer.from(authheader.split(' ')[1],
//       'base64').toString().split(':');
//   const user = auth[0];
//   const pass = auth[1];

//   if (user == 'admin' && pass == 'admin') {

//       // If Authorized user
//       next();
//   } else {
//       let err = new Error('You are not authenticated!');
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status = 401;
//       return next(err);
//   }

// }

// app.use(authentication)
app.use(cors(corsOptions));
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
