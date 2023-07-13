import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const ticketId = Number(req.query.ticketId);

        if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

        const payment = await paymentsService.getPaymentByTicketId(userId, ticketId);

        if(!payment) return res.sendStatus(httpStatus.NOT_FOUND);

        return res.status(httpStatus.OK).send(payment);
    } catch (error) {
        if(error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);

        return res.status(httpStatus.NOT_FOUND);
    }
}
