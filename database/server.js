
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'SEU_USUARIO_MYSQL', 
    password: 'SUA_SENHA_MYSQL', 
    database: 'NOME_DO_SEU_BANCO' 
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});


app.get('/api/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        } else {
            res.json(results);
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});