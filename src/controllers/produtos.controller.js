const { getConnection, sql } = require('../database/connection');

async function listarProdutos(req, res) {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
      SELECT 
        p.id,
        p.nome,
        p.marca,
        p.nota_nutricional,
        p.impacto_ambiental,
        p.categoria_id,
        c.nome AS categoria_nome
      FROM produtos p
      INNER JOIN categorias c
        ON c.id = p.categoria_id
      ORDER BY p.id DESC
    `);

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao listar produtos',
      detalhe: error.message
    });
  }
}

async function buscarProdutoPorId(req, res) {
  try {
    const { id } = req.params;
    const pool = await getConnection();

    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT 
          p.id,
          p.nome,
          p.marca,
          p.nota_nutricional,
          p.impacto_ambiental,
          p.categoria_id,
          c.nome AS categoria_nome
        FROM produtos p
        INNER JOIN categorias c
          ON c.id = p.categoria_id
        WHERE p.id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        erro: 'Produto não encontrado'
      });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao buscar produto',
      detalhe: error.message
    });
  }
}

async function criarProduto(req, res) {
  try {
    const {
      nome,
      marca,
      nota_nutricional,
      impacto_ambiental,
      categoria_id
    } = req.body;

    if (!nome || !categoria_id) {
      return res.status(400).json({
        erro: 'Os campos nome e categoria_id são obrigatórios'
      });
    }

    const pool = await getConnection();

    const result = await pool.request()
      .input('nome', sql.VarChar(150), nome)
      .input('marca', sql.VarChar(100), marca || null)
      .input('nota_nutricional', sql.Decimal(5, 2), nota_nutricional || null)
      .input('impacto_ambiental', sql.VarChar(50), impacto_ambiental || null)
      .input('categoria_id', sql.Int, categoria_id)
      .query(`
        INSERT INTO produtos 
          (nome, marca, nota_nutricional, impacto_ambiental, categoria_id)
        OUTPUT 
          INSERTED.id,
          INSERTED.nome,
          INSERTED.marca,
          INSERTED.nota_nutricional,
          INSERTED.impacto_ambiental,
          INSERTED.categoria_id
        VALUES 
          (@nome, @marca, @nota_nutricional, @impacto_ambiental, @categoria_id)
      `);

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao criar produto',
      detalhe: error.message
    });
  }
}

async function atualizarProduto(req, res) {
  try {
    const { id } = req.params;

    const {
      nome,
      marca,
      nota_nutricional,
      impacto_ambiental,
      categoria_id
    } = req.body;

    if (!nome || !categoria_id) {
      return res.status(400).json({
        erro: 'Os campos nome e categoria_id são obrigatórios'
      });
    }

    const pool = await getConnection();

    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('nome', sql.VarChar(150), nome)
      .input('marca', sql.VarChar(100), marca || null)
      .input('nota_nutricional', sql.Decimal(5, 2), nota_nutricional || null)
      .input('impacto_ambiental', sql.VarChar(50), impacto_ambiental || null)
      .input('categoria_id', sql.Int, categoria_id)
      .query(`
        UPDATE produtos
        SET 
          nome = @nome,
          marca = @marca,
          nota_nutricional = @nota_nutricional,
          impacto_ambiental = @impacto_ambiental,
          categoria_id = @categoria_id
        OUTPUT 
          INSERTED.id,
          INSERTED.nome,
          INSERTED.marca,
          INSERTED.nota_nutricional,
          INSERTED.impacto_ambiental,
          INSERTED.categoria_id
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        erro: 'Produto não encontrado'
      });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao atualizar produto',
      detalhe: error.message
    });
  }
}

async function excluirProduto(req, res) {
  try {
    const { id } = req.params;
    const pool = await getConnection();

    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        DELETE FROM produtos
        OUTPUT DELETED.id, DELETED.nome
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        erro: 'Produto não encontrado'
      });
    }

    res.status(200).json({
      mensagem: 'Produto excluído com sucesso',
      produto: result.recordset[0]
    });
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao excluir produto',
      detalhe: error.message
    });
  }
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  excluirProduto
};