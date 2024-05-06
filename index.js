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

app.get("/", (req, res) => {
    res.send("Seja Bem-vindo a API de HEROS");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
});