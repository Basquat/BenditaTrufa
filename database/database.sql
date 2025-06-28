CREATE DATABASE IF NOT EXISTS doceria_db;

USE doceria_db;

-- 3. Cria a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('cliente', 'admin') DEFAULT 'cliente',10
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, email, senha, tipo)
VALUES ('Ryan Admin', 'admin@doceria.com', 'admin123', 'admin');

SELECT * FROM usuarios;
