/*
Esse arquivo tem uma única responsabilidade: criar o client do Supabase e exportar ele. Todo service que precisar falar com o banco vai importar daqui — você não cria a conexão em vários lugares, cria uma vez e reutiliza.
*/

//Importar createClient do @supabase/supabase-js

import { createClient } from "@supabase/supabase-js";

//Ler as duas variáveis do process.env

import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

//Criar o client

const supabaseClient = createClient(
    supabaseUrl,
    supabaseAnonKey
);

//Exportar ele

export default supabaseClient;