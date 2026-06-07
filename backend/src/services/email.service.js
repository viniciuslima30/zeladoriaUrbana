/*
Importar o Resend
Criar o client com a API key
Exportar função sendStatusEmail(ticket) que recebe o ticket completo e envia o email
*/

import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendStatusEmail(ticket) {
    await resend.emails.send({
        from: 'Zela <onboarding@resend.dev>',
        to: ticket.user_email,
        subject: 'Atualização da sua reclamação - Zeladoria Urbana',
        html: `
            <h2>Olá, ${ticket.user_name}!</h2>
            <p>Sua reclamação foi atualizada.</p>
            <p><strong>Protocolo:</strong> ${ticket.id}</p>
            <p><strong>Descrição:</strong> ${ticket.description}</p>
            <p><strong>Status atual:</strong> ${ticket.status}</p>
            <p>Obrigado por usar o site da Zeladoria Urbana.</p>
        `
    });
}