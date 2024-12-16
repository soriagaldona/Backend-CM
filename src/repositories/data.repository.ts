import { AppDataSource } from "../utils/data-source";

/**
 * Inserta o actualiza los datos en la base de datos según su clasificación.
 * @param classification Clasificación de los datos.
 * @param data Datos a insertar o actualizar.
 */
export const upsertDataToDatabase = async (classification: string, data: any[]): Promise<void> => {
  // Crear un repositorio dinámico según la clasificación
  const repository = AppDataSource.getRepository(classification);

  for (const row of data) {
    const existing = await repository.findOneBy({ id: row.id }); // Reemplaza `id` con tu clave primaria

    if (existing) {
      await repository.save({ ...existing, ...row }); // Actualizar si ya existe
    } else {
      const newRow = repository.create(row);
      await repository.save(newRow); // Insertar si no existe
    }
  }
};
