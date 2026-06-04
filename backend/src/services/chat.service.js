/*
Receber message e history (array de mensagens anteriores)
Montar o array de mensagens pro Groq: system prompt + histórico + mensagem nova
Chamar o Groq com o modelo llama-3.3-70b-versatile
Retornar o texto da resposta
*/

// 1. import do groq-sdk

import Groq from "groq-sdk";

// 2. criar o client do Groq com a API key

import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// 3. definir o system prompt (string com as instruções)

const systemPrompt =`Você é uma atendente virtual de zeladoria urbana chamada Zela. Seu objetivo é registrar reclamações de problemas urbanos para a prefeitura.

Siga estas regras:
- Faça uma pergunta por vez
- Colete as informações nessa ordem: nome, telefone, email, descrição do problema
- Seja cordial e objetiva
- Quando tiver todas as informações, confirme com o usuário antes de finalizar

Categorias disponíveis: buraco, poste, lixo, vazamento, arvore, outro

Quando o usuário confirmar, inclua ao final da sua mensagem o seguinte JSON (sem formatação extra):
{"coletado": true, "user_name": "...", "user_phone": "...", "user_email": "...", "description": "...", "category": "..."}`;

// 4. exportar função sendMessage(message, history)

export async function sendMessage(message, history) {

    //    4.1 montar o array de mensagens: [system, ...history, nova mensagem]

    const messages = [
        {role: 'system', content: systemPrompt},
        ...history,
        {role: 'user', content: message}
    ];

    //    4.2 chamar groq.chat.completions.create(...)

    const completion = await groq.chat.completions.create({
        messages: messages,
        model: 'llama-3.3-70b-versatile'
    });

    //    4.3 retornar o texto da resposta

    return completion.choices[0].message.content;
}
