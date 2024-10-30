const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'sua_base_de_dados',
  password: 'sua_senha',
  port: 5432,
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para listar alunos
app.get('/alunos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agenda_alunos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para adicionar aluno
app.post('/alunos', async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO agenda_alunos (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, telefone]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para excluir aluno
app.delete('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM agenda_alunos WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
