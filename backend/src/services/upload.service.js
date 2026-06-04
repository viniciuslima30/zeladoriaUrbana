// 1. importar o client do Supabase

import supabaseClient from "../config/supabase.js";

// 2. exportar função uploadImage(file)
    export async function uploadImage(file) {
    
        // 2.1 montar o caminho único do arquivo usando Date.now() e file.originalname
        
        const caminho = `${Date.now()}_${file.originalname}`;
        // 2.2 fazer upload pro Supabase Storage com supabase.storage.from().upload()

        await supabaseClient.storage
        .from('tickets-image').
        upload(
            caminho, file.buffer, {contentType: file.mimetype}
        );
        // 2.3 montar a URL pública com supabase.storage.from().getPublicUrl()

        const { data } = supabaseClient.storage
        .from('tickets-image')
        .getPublicUrl(caminho);

        // 2.4 retornar a URL pública

        return data.publicUrl;
    }
    