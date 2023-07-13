import { notFoundError } from "@/errors";
import { CreateTicket } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

async function getTicketByUser(userId: number): Promise<Ticket> {
    const verifyEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(!verifyEnrollment) throw notFoundError();

    const ticket = await ticketRepository.findTicketByEnrollment(verifyEnrollment.id);

    if(!ticket) throw notFoundError();

    return ticket;
}

async function getTicketTypes(): Promise<TicketType[]> {
    const types = await ticketRepository.findTypes();
    return types;
}

async function createTicket(userId: number, ticketTypeId: number): Promise<Ticket> {
    const verifyEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(!verifyEnrollment) throw notFoundError();

    const ticketData: CreateTicket = {
        ticketTypeId,
        enrollmentId: verifyEnrollment.id,
        status: TicketStatus.RESERVED,
    }

    await ticketRepository.createTicket(ticketData);
    
    const ticket = await ticketRepository.findTicketByEnrollment(verifyEnrollment.id);
    
    return ticket;
}

const ticketsService = {
    getTicketByUser,
    getTicketTypes,
    createTicket,
}

export default ticketsService;