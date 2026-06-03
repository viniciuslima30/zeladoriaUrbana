/*
Carregar as variáveis de ambiente
Configurar o Express com os middlewares globais
Registrar as rotas e subir o servidor
*/

// 1. variáveis de ambiente — sempre primeiro

import dotenv from "dotenv";

dotenv.config();

// 2. imports

import express from "express";
import cors from "cors";

// 3. instanciar o app

const app = express();

// 4. middlewares globais (cors, express.json)

app.use(express.json());
app.use(cors());

// 5. rotas (você vai registrar aqui quando criar os arquivos de rota)

app.get('/', (req, res) => {
    res.json({message: 'api funcionando'});
})

// 6. app.listens

const porta = process.env.PORT;

app.listen(porta, () => {
    console.log(`Servidor rodando na porta http://localhost:${porta}`);
})