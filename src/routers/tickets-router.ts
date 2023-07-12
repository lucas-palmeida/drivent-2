import { getTicketByUser, getTicketTypes } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/', getTicketByUser)
    .get('/types', getTicketTypes);

export { ticketsRouter };