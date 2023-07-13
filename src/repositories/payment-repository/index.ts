import { prisma } from "@/config";

function findPaymentByTicketId(ticketId: number) {
    return prisma.payment.findFirst({
        where: {
            ticketId
        },
    });
}

const paymentRepository = {
    findPaymentByTicketId,
}

export default paymentRepository;