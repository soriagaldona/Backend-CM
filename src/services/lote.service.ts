import { CreateLoteDTO, UpdateLoteDTO, LoteFilters } from "../interfaces/lote.interface";
import { createLote, findLotes, updateLote, findLoteById } from "../repositories/lote.repository";

export const createNewLote = async (data: CreateLoteDTO, userId: number) => {
    return await createLote(data, userId);
};

export const getLotes = async (filters: LoteFilters) => {
    return await findLotes(filters);
};

export const updateExistingLote = async (id: number, data: UpdateLoteDTO, userId: number) => {
    const lote = await findLoteById(id);
    if (!lote) {
        throw new Error(`Lote with ID ${id} not found`);
    }
    return await updateLote(id, data, userId);
};