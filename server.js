const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = new sqlite3.Database('DB/db_xgames.sqlite');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static('public'));

app.use(bodyParser.json());

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

// Cadastras Usuários
app.post('/cadastrar_user', (req, res) => {
    const { nome, email, senha, dt_nascimento, sexo, n_celular } = req.body;

    db.run('INSERT INTO tb_user (nome, email, senha, dt_nascimento, sexo, n_celular) VALUES (?, ?, ?, ?, ?, ?)', [nome, email, senha, dt_nascimento, sexo, n_celular], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
  
        // ID do objeto inserido
        const userID = this.lastID;
  
        // Responder com os dados do objeto cadastrado
        res.status(201).json({ id: userID, nome, email, senha, dt_nascimento, adm: 0, sexo, n_celular, jogo_user: null });
    });
});

// Cadastrar Jogos
app.post('/cadastrar_jogo', (req, res) => {
    const { nome, genero, faixa_etaria, dt_lancamento, desenvolvedora, valor, avaliacao, img, overview } = req.body;

    db.run('INSERT INTO tb_jogos (nome, genero, faixa_etaria, dt_lancamento, desenvolvedora, valor, avaliacao, img, overview) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nome, genero, faixa_etaria, dt_lancamento, desenvolvedora, valor, avaliacao, img, overview], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // ID do objeto inserido
        const jogoId = this.lastID;

        // Responder com os dados do objeto cadastrado
        res.status(201).json({id: jogoId, nome, genero, faixa_etaria, dt_lancamento, desenvolvedora, valor, avaliacao, img, overview});
    });
});

// Atualizar valores dos jogos do usuário
app.post('/atualizar-valor', (req, res) => {
    const { id, nomeJogo } = req.body;
    const sqlQuery = 'UPDATE tb_user SET jogo_user = ? WHERE id = ?';

    db.run(sqlQuery, [nomeJogo, id], function(err) {
        if(err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Valor atualizado com sucesso!' });
    });
});

app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});