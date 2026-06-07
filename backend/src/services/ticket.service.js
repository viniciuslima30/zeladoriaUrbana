/*
Importar o client do Supabase
Exportar função createTicket(dados) que recebe o objeto com todos os campos
Inserir no banco com supabase.from('tickets').insert(dados).select()
Retornar o ticket criado
*/

// 1. importar o client do Supabase

import supabaseClient from "../config/supabase.js";
import { sendStatusEmail } from "./email.service.js";

// 2. exportar função createTicket(dados)

export async function createTicket(dados) {
    // 2.1 inserir no banco com supabase.from('tickets').insert(dados).select()

    const { data, error } = await supabaseClient
    .from('tickets') //tabela
    .insert(dados) // insere o obj
    .select()  // retorna o registro inserido
    .single(); // pega só um objeto em vez de array

    if (error) throw error;
    
    // 2.2 retornar o ticket criado

    return data;
}

//  listar todos os chamados pro painel admin

export async function getTickets() {
    const { data, error } = await supabaseClient
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
}

// atualizar status

export async function updateTicketStatus(id, status) {
    const { data, error } = await supabaseClient
        .from('tickets')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    await sendStatusEmail(data); // envia email com o ticket atualizado

    return data;
}