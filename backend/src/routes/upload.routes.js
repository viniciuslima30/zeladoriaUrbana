// 1. importar Router do express

import { Router } from "express";

// 2. importar multer

import multer from "multer";

// 3. importar uploadController

import { uploadController } from "../controllers/upload.controller.js";

// 4. criar o router

const router = Router();

// 5. configurar o multer com memoryStorage

const upload = multer({storage: multer.memoryStorage()});

// 6. definir a rota POST /upload com multer e controller

router.post('/upload', upload.single('image'), uploadController);

// 7. exportar o router

export default router;