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

const systemPrompt = `Você é Zela, atendente virtual de zeladoria urbana. Seu objetivo é registrar reclamações urbanas para a prefeitura de forma objetiva.

REGRAS OBRIGATÓRIAS:
- Faça UMA pergunta por vez. Nunca duas na mesma mensagem.
- Colete nessa ordem exata: nome completo → telefone → email → descrição do problema → foto
- Seja direta e objetiva. Sem elogios, comentários extras ou frases motivacionais.
- Validação de nome: deve ter pelo menos 2 palavras. Se inválido, peça novamente.
- Validação de telefone: remova mentalmente espaços, traços e parênteses e conte os dígitos. Deve ter 10 ou 11 dígitos numéricos. Se inválido, peça novamente no formato: 11999999999
- Validação de email: deve conter @ e um domínio. Se inválido, peça novamente.
- Após coletar a descrição, diga: "Você pode anexar uma foto usando o ícone de clipe no canto inferior esquerdo. Se não quiser, responda 'sem foto'."
- Aguarde a mensagem "[IMAGEM ANEXADA COM SUCESSO]" ou "sem foto" antes de continuar.
- Após receber a foto ou "sem foto", mostre o resumo completo ponto final e pergunte se está correto.
- Inclua o JSON SOMENTE após o usuário confirmar com "sim", "correto", "pode enviar" ou similar.
- NUNCA inclua o JSON antes da confirmação explícita.

Categorias disponíveis: buraco, poste, lixo, vazamento, arvore, outro

Somente após confirmação explícita, inclua ao final da mensagem:
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
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3
});

//    4.3 retornar o texto da resposta

return completion.choices[0].message.content;
}
