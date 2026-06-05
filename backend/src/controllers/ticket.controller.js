// 1. importar createTicket do service e novo getTickets e novo updateTicketStatus

import { createTicket, getTickets, updateTicketStatus } from "../services/ticket.service.js";

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

export async function getTicketsController(req, res) {
    try {
        const resposta = await getTickets();

        res.json({resposta: resposta});
    } catch (err) {
        console.error(err);
        res.status(404).json({erro: 'lista não encontrada'});
    }
}

export async function updateTicketStatusController(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const resposta = await updateTicketStatus(id, status);

        res.json({resposta: resposta});
    } catch (err) {
        console.error(err);
        res.status(404).json({erro: 'id ou status não encontrado'});
    }
}