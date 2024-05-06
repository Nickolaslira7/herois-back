CREATE TABLE personagem (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    vida INT NOT NULL,
    dano INT NOT NULL,
    defesa INT NOT NULL
);