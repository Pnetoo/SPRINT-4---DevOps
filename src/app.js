const express = require('express');
const cors = require('cors');

const categoriasRoutes = require('./routes/categorias.routes');
const produtosRoutes = require('./routes/produtos.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'EcoTrack API em execução',
    versao: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

app.use('/categorias', categoriasRoutes);
app.use('/produtos', produtosRoutes);

module.exports = app;