-- Apaga a tabela se já existir
DROP TABLE IF EXISTS agenda_alunos;

-- Cria a tabela com chave primária e campo SERIAL
CREATE TABLE agenda_alunos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT
);

-- Insere dados de exemplo
INSERT INTO agenda_alunos (nome, email, telefone) 
VALUES 
  ('Carlos Silva', 'carlos@email.com', '12345-6789'),
  ('Ana Costa', 'ana@email.com', '98765-4321');

-- Verifica se os dados foram inseridos corretamente
SELECT * FROM agenda_alunos;

GRANT ALL PRIVILEGES ON DATABASE sua_base_de_dados TO seu_usuario;

