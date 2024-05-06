CREATE TABLE historico (
id SERIAL PRIMARY KEY,
vencedor INT NOT NULL,
perdedor INT NOT NULL,
data DATE NOT NULL,
FOREIGN KEY (vencedor) REFERENCES personagem(id),
FOREIGN KEY (perdedor) REFERENCES personagem(id)

);

