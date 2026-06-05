// 1. importar Router do express

import { Router } from "express";

// 2. importar ticketController do controller

import { ticketController } from "../controllers/ticket.controller.js";

// 3. criar o router

const router = Router();

// 4. definir a rota POST /ticket apontando pro ticketController

router.post('/tickets', ticketController);

// 5. exportar o router

export default router;