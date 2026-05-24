INSERT INTO categorias (nome, descricao)
VALUES
('Alimentos', 'Produtos alimentícios em geral'),
('Bebidas', 'Bebidas industrializadas e naturais'),
('Higiene', 'Produtos de higiene pessoal');

INSERT INTO produtos 
(nome, marca, nota_nutricional, impacto_ambiental, categoria_id)
VALUES
('Barra de Cereal Integral', 'EcoFood', 8.50, 'Baixo', 1),
('Suco Natural de Laranja', 'BioJuice', 9.00, 'Médio', 2),
('Sabonete Vegetal', 'GreenCare', NULL, 'Baixo', 3);