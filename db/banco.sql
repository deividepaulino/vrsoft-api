CREATE TABLE curso (
  codigo SERIAL PRIMARY KEY,
  descricao VARCHAR(50) NOT NULL,
  ementa TEXT
);



CREATE TABLE aluno (
  codigo SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

CREATE TABLE curso_aluno (
  codigo SERIAL PRIMARY KEY,
  codigo_aluno INT REFERENCES aluno(codigo) ON DELETE CASCADE,
  codigo_curso INT REFERENCES curso(codigo) ON DELETE CASCADE
);
