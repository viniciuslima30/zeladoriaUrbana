import supabaseClient from "../config/supabase.js";

export async function uploadImage(file) {
    const caminho = `${Date.now()}_${file.originalname}`;
    
    const { data, error } = await supabaseClient.storage
        .from('tickets-image')
        .upload(caminho, file.buffer, { contentType: file.mimetype });

    console.log('upload data:', data);
    console.log('upload error:', error);

    if (error) throw error;

    const { data: urlData } = supabaseClient.storage
        .from('tickets-image')
        .getPublicUrl(caminho);

    return urlData.publicUrl;
}