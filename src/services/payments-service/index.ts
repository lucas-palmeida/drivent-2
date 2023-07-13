import { notFoundError, unauthorizedError } from "@/errors";
import { CardPaymentParams, CreatePayment } from "@/protocols";
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

async function paymentProcess(ticketId: number, userId: number, cardData: CardPaymentParams)  {
    await checkTicketAndEnrollment(ticketId, userId);

    const ticket = await ticketRepository.findTicketWithTypeById(ticketId);

    const paymentData: CreatePayment = {
        ticketId,
        value: ticket.TicketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4),
    }

    const payment = await paymentRepository.createPayment(ticketId, paymentData);
    await ticketRepository.ticketProcessPayment(ticketId);

    return payment;
}

const paymentsService = {
    getPaymentByTicketId,
    paymentProcess,
}

export default paymentsService;