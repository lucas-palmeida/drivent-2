import { prisma } from "@/config";

async function findFirst(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: { enrollmentId },
        include: {
            TicketType: true,
        },
    });
}

async function findMany() {
    return await prisma.ticketType.findMany();
}

const ticketRepository = {
    findFirst,
    findMany
}

export default ticketRepository;