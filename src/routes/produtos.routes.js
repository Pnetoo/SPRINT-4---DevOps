const express = require('express');

const {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  excluirProduto
} = require('../controllers/produtos.controller');

const router = express.Router();

router.get('/', listarProdutos);
router.get('/:id', buscarProdutoPorId);
router.post('/', criarProduto);
router.put('/:id', atualizarProduto);
router.delete('/:id', excluirProduto);

module.exports = router;