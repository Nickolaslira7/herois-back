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
app.delete("/hero/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM personagem WHERE id = $1", [id]);
        res.send("Personagem deletado com sucesso!");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get("/luta/:id/:id2", async (req, res) => {
    const {id, id2} = req.params;
    try{
        const {rows} = await pool.query("SELECT * FROM personagem where id = $1 OR id = $2", [id, id2])
        const personagem1 = rows[0];
        const personagem2 = rows[1];

        if (!personagem1 || !personagem2) {
            res.send("Personagem não encontrado");
        }
        let campeao = null;
        let perdedor = null;

        while (personagem1.vida > 0 && personagem2.vida > 0) {
            personagem2.vida -= personagem1.dano - personagem2.defesa;
            personagem1.vida -= personagem2.dano - personagem1.defesa;
        }
        if (personagem1.vida <= 0 || personagem2.vida > personagem1.vida) {
            campeao = personagem2;
            perdedor = personagem1;
        } else if (personagem2.vida == personagem1.vida) {
            campeao = null;
        }
        else {
            campeao = personagem1;
            perdedor = personagem2;
        }
        res.send({ campeao, perdedor})
    } catch (error){
        console.log(error);
        res.sendStatus(500)
    }
})


app.get("/", (req, res) => {
    res.send("Seja Bem-vindo a API de HEROS");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
});