import { createTicket, getTicketByUser, getTicketTypes } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/tickets-schema";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/', getTicketByUser)
    .get('/types', getTicketTypes)
    .post('/', validateBody(ticketSchema), createTicket);

export { ticketsRouter };