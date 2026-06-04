// 1. importar uploadImage do service

import { uploadImage } from "../services/upload.service.js";

// 2. exportar função uploadController(req, res)

    export async function uploadController(req, res) {
        // try/catch
        try {
            // 2.1 pegar o arquivo de req.file
            
            const arquivo = req.file;
            // 2.2 chamar uploadImage(file)

            const resposta = await uploadImage(arquivo);
            // 2.3 devolver res.json({ url })

            res.json({resposta: resposta});
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'erro ao carregar imagem'})
        }

    }

    