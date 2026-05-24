const express = require('express');

const {
  listarCategorias,
  criarCategoria
} = require('../controllers/categorias.controller');

const router = express.Router();

router.get('/', listarCategorias);
router.post('/', criarCategoria);

module.exports = router;