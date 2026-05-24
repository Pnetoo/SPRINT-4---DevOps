const { getConnection, sql } = require('../database/connection');

async function listarCategorias(req, res) {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
      SELECT id, nome, descricao
      FROM categorias
      ORDER BY id DESC
    `);

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao listar categorias',
      detalhe: error.message
    });
  }
}

async function criarCategoria(req, res) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({
        erro: 'O campo nome é obrigatório'
      });
    }

    const pool = await getConnection();

    const result = await pool.request()
      .input('nome', sql.VarChar(100), nome)
      .input('descricao', sql.VarChar(255), descricao || null)
      .query(`
        INSERT INTO categorias (nome, descricao)
        OUTPUT INSERTED.id, INSERTED.nome, INSERTED.descricao
        VALUES (@nome, @descricao)
      `);

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao criar categoria',
      detalhe: error.message
    });
  }
}

module.exports = {
  listarCategorias,
  criarCategoria
};