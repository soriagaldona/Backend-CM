import { AppDataSource } from "../utils/data-source";
import { LoteEntity } from "../models/lote.model";
import { LoteHistoryEntity } from "../models/loteHistory.model";
import { CreateLoteDTO, UpdateLoteDTO, LoteFilters } from "../interfaces/lote.interface";

export const loteRepository = AppDataSource.getRepository(LoteEntity);
export const loteHistoryRepository = AppDataSource.getRepository(LoteHistoryEntity);

export const createLote = async (data: CreateLoteDTO, userId: number) => {
    const lote = loteRepository.create({
        ...data,
        createdBy: userId
    });
    return await loteRepository.save(lote);
};

export const findLotes = async (filters: LoteFilters) => {
    const queryBuilder = loteRepository.createQueryBuilder("lote")
        .leftJoinAndSelect("lote.creator", "creator")
        .leftJoinAndSelect("lote.updateHistory", "history")
        .leftJoinAndSelect("history.updater", "updater")
        .select([
            'lote.id',
            'lote.lote_name',
            'lote.potreros_id',
            'lote.latitude',
            'lote.longitude',
            'lote.createdBy',
            'lote.createdOn',
            'creator.UsuarioID',
            'creator.nombre',
            'creator.apellido',
            'history',
            'updater.UsuarioID',
            'updater.nombre',
            'updater.apellido'
        ]);

    if (filters.potreros_id) {
        queryBuilder.andWhere("lote.potreros_id = :potreros_id", { potreros_id: filters.potreros_id });
    }
    if (filters.lote_name) {
        queryBuilder.andWhere("lote.lote_name ILIKE :lote_name", { lote_name: `%${filters.lote_name}%` });
    }
    if (filters.created_by) {
        queryBuilder.andWhere("lote.createdBy = :created_by", { created_by: filters.created_by });
    }
    if (filters.created_on) {
        queryBuilder.andWhere("DATE(lote.createdOn) = DATE(:created_on)", { created_on: filters.created_on });
    }

    queryBuilder.orderBy("history.updatedOn", "DESC");

    return await queryBuilder.getMany();
};

export const updateLote = async (id: number, data: UpdateLoteDTO, userId: number) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // Update the lote
        await queryRunner.manager.update(LoteEntity, id, data);

        // Create history record
        const historyEntry = queryRunner.manager.create(LoteHistoryEntity, {
            lote_id: id,
            updatedBy: userId
        });
        await queryRunner.manager.save(historyEntry);

        await queryRunner.commitTransaction();

        return await findLoteById(id);
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    } finally {
        await queryRunner.release();
    }
};

export const findLoteById = async (id: number) => {
    return await loteRepository.createQueryBuilder("lote")
        .leftJoinAndSelect("lote.creator", "creator")
        .leftJoinAndSelect("lote.updateHistory", "history")
        .leftJoinAndSelect("history.updater", "updater")
        .select([
            'lote.id',
            'lote.lote_name',
            'lote.potreros_id',
            'lote.latitude',
            'lote.longitude',
            'lote.createdBy',
            'lote.createdOn',
            'creator.UsuarioID',
            'creator.nombre',
            'creator.apellido',
            'history',
            'updater.UsuarioID',
            'updater.nombre',
            'updater.apellido'
        ])
        .where("lote.id = :id", { id })
        .orderBy("history.updatedOn", "DESC")
        .getOne();
};