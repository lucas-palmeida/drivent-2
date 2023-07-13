import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Payment } from "@prisma/client";

async function checkTicketAndEnrollment(ticketId: number, userId: number) {
    const verifyTicket = await ticketRepository.findTicketById(ticketId);

    if(!verifyTicket) throw notFoundError();

    const verifyEnrollment = await enrollmentRepository.findEnrollmentById(verifyTicket.enrollmentId);

    if(!verifyEnrollment) throw notFoundError();

    if(verifyEnrollment.userId !== userId) throw unauthorizedError();
}

async function getPaymentByTicketId(userId: number, ticketId: number): Promise<Payment> {
    await checkTicketAndEnrollment(ticketId, userId);

    const payment = await paymentRepository.findPaymentByTicketId(ticketId);

    if(!payment) throw notFoundError();

    return payment;
}

const paymentsService = {
    getPaymentByTicketId,
}

export default paymentsService;