import Joi from "joi";

const paymentSchema = Joi.object({
    ticketId: Joi.number().required(),
    cardData: Joi.object().required(),
});

export default paymentSchema;