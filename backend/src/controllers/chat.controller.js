/*
Receber message e history do req.body
Chamar sendMessage(message, history)
Devolver a resposta com res.json()
*/

// 1. importar a função sendMessage do service

import { sendMessage } from "../services/chat.service.js";

// 2. exportar a função do controller — chama de chatController
//    ela recebe (req, res) como todo controller Express

export async function chatController(req, res) {

   try {
        const {message, history} = req.body;
        const retorno = await sendMessage(message, history);
        res.json({resposta: retorno});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao processar mensagem' });
    }
}