import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketByUser(userId: number): Promise<Ticket> {
    const verifyEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(!verifyEnrollment) throw notFoundError();

    const enrollmentId = verifyEnrollment.id;

    const ticket = await ticketRepository.findFirst(enrollmentId);

    if(!ticket) throw notFoundError();

    return ticket;
}

async function getTicketTypes(): Promise<TicketType[]> {
    const types = await ticketRepository.findMany();
    return types;
}

const ticketsService = {
    getTicketByUser,
    getTicketTypes
}

export default ticketsService;