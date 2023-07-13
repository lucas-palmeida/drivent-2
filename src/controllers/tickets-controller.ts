import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketByUser(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const ticket = await ticketsService.getTicketByUser(userId);
        return res.status(httpStatus.OK).send(ticket);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
    try {
        const types = await ticketsService.getTicketTypes();
        return res.status(httpStatus.OK).send(types);
    } catch (error) {
        return res.send(httpStatus.NOT_FOUND);
    }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId } = req.body;
    try {
        const createdTicket = await ticketsService.createTicket(userId, ticketTypeId);
    
        return res.status(httpStatus.CREATED).send(createdTicket);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}