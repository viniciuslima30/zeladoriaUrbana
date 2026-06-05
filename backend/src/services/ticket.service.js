/*
Importar o client do Supabase
Exportar função createTicket(dados) que recebe o objeto com todos os campos
Inserir no banco com supabase.from('tickets').insert(dados).select()
Retornar o ticket criado
*/

// 1. importar o client do Supabase

import supabaseClient from "../config/supabase.js";

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
    