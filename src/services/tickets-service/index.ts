import { TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<TicketType> {
    const types = await ticketsRepository.findMany();
    return types;
}

const ticketsService = {
    getTicketTypes
}

export default ticketsService;