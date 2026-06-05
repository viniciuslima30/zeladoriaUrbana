// 1. importar createTicket do service

import { createTicket } from "../services/ticket.service.js";

// 2. exportar função ticketController(req, res)

    export async function ticketController(req, res) {
            // try/catch
        try {
            // 2.1 extrair os dados do req.body

            const dados = req.body;
            // 2.2 chamar createTicket(dados)

            const resposta = await createTicket(dados);
            // 2.3 devolver res.json com o ticket criado
            
            res.json({resposta: resposta});
        } catch (err) {
            console.error(err);
            res.status(500).json({erro: 'erro ao criar ticket'})
        }
    }
    