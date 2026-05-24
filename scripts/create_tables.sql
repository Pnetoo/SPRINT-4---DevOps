IF OBJECT_ID('produtos', 'U') IS NOT NULL
    DROP TABLE produtos;

IF OBJECT_ID('categorias', 'U') IS NOT NULL
    DROP TABLE categorias;

CREATE TABLE categorias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255)
);

CREATE TABLE produtos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    marca VARCHAR(100),
    nota_nutricional DECIMAL(5,2),
    impacto_ambiental VARCHAR(50),
    categoria_id INT NOT NULL,
    CONSTRAINT fk_produto_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
);