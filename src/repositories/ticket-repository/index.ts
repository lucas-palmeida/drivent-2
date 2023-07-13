import { prisma } from "@/config";
import { CreateTicket } from "@/protocols";
import { TicketStatus } from "@prisma/client";

async function findTicketByEnrollment(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: { 
            enrollmentId
        },
        include: {
            TicketType: true,
        },
    });
}

async function findTypes() {
    return prisma.ticketType.findMany();
}

async function createTicket(ticket: CreateTicket) {
    return prisma.ticket.create({
        data: ticket
    });
}

async function findTicketById(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId,
        },
        include: {
            Enrollment: true,
        },
    });
}

async function findTicketWithTypeById(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId,
        },
        include: {
            TicketType: true,
        }
    });
}

async function ticketProcessPayment(ticketId: number) {
    return prisma.ticket.update({
        where: {
            id: ticketId,
        },
        data: {
            status: TicketStatus.PAID,
        },
    });
}

const ticketRepository = {
    findTicketByEnrollment,
    findTypes,
    createTicket,
    findTicketById,
    findTicketWithTypeById,
    ticketProcessPayment,
}

export default ticketRepository;