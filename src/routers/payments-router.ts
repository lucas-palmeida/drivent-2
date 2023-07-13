import { getPaymentByTicketId, paymentProcess } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import paymentSchema from "@/schemas/payment-schema";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .all('/*', authenticateToken)
    .get('/', getPaymentByTicketId)
    .post('/process', validateBody(paymentSchema), paymentProcess);

export { paymentsRouter };