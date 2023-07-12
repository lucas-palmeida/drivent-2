import ticketsService from '@/services/tickets-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketTypes(req: Request, res: Response) {
    try {
        const types = await ticketsService.getTicketTypes();
        return res.status(httpStatus.OK).send(types);
    } catch (error) {
        return res.send(httpStatus.NOT_FOUND);
    }
}