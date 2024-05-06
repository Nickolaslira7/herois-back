const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "hero",
    password: "ds564",
    port: 7007,
});

app.get("/hero", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM personagem");
        res.send(rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get("/hero/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM personagem WHERE id = $1", [id]);
        res.send(rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post("/hero", async (req, res) => {
    const { nome, vida, dano, defesa} = req.body;
    try {
        await pool.query("INSERT INTO personagem (nome, vida, dano, defesa) VALUES ($1, $2, $3, $4)", [nome, vida, dano, defesa]);
        res.send("Personagem criado com sucesso!");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put("/hero/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, vida, dano, defesa} = req.body;
    try {
        await pool.query("UPDATE personagem SET nome = $1, vida = $2, dano = $3, defesa = $4 WHERE id = $5", [nome, vida, dano, defesa, id]);
        res.send("Personagem atualizado com sucesso!");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.get("/", (req, res) => {
    res.send("Seja Bem-vindo a API de HEROS");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
});