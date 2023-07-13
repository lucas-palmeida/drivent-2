import { prisma } from "@/config";
import { CreateTicket } from "@/protocols";

function findTicketByEnrollment(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: { 
            enrollmentId
        },
        include: {
            TicketType: true,
        },
    });
}

function findTypes() {
    return prisma.ticketType.findMany();
}

function createTicket(ticket: CreateTicket) {
    return prisma.ticket.create({
        data: ticket
    });
}

function findTicketById(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId,
        },
        include: {
            Enrollment: true,
        },
    });
}

const ticketRepository = {
    findTicketByEnrollment,
    findTypes,
    createTicket,
    findTicketById
}

export default ticketRepository;