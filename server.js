const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('db_xgames.sqlite');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static('public'));

// Obter dados da tabela tb_user
app.get('/getData', (req, res) => {
    db.all('SELECT * FROM tb_user', (err, rows) => {
        if (err) {
            res.status(500).send('Erro ao obter dados do banco de dados.');
        } else {
            const data = rows;
            res.json(data);
        }
    });
});

// Rota para obter a quantidade de objetos na tabela tb_user
var contador = 0;

app.get('/quantidade-objetos', (req, res) => {
    const sqlQuery = 'SELECT COUNT(*) AS quantidade FROM tb_user';
    db.get(sqlQuery, (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Erro interno do servidor.', details: err.message });
            return;
        }

        contador = row.quantidade;

        res.json({ quantidade: contador });
    });
});

// Obter dados da tabela tb_jogos
app.get('/getDataJogos', (req, res) => {
    db.all('SELECT * FROM tb_jogos', (err, rows) => {
        if (err) {
            res.status(500).send('Erro ao obter dados do banco de dados.');
        } else {
            const data = rows;
            res.json(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});
