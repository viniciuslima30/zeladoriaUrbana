// 1. importar Router do express

import { Router } from "express";

// 2. importar ticketController do controller e novo getTicketsController e novo updateTicketStatusController e novo deleteTicketController

import { ticketController, getTicketsController, updateTicketStatusController, deleteTicketController } from "../controllers/ticket.controller.js";

// 3. criar o router

const router = Router();

// 4. definir a rota POST /ticket apontando pro ticketController

router.post('/tickets', ticketController);
router.get('/tickets', getTicketsController);
router.patch('/tickets/:id', updateTicketStatusController);
router.delete('/tickets/:id', deleteTicketController);

// 5. exportar o router

export default router;