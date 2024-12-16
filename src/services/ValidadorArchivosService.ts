import { In } from "typeorm";
import ValidadorArchivosInput from "../interfaces/ValidadorArchivos";
import { AppDataSource } from "../utils/data-source";
import { ValidadorArchivos } from "../models/ValidadorArchivos";


/**
 * Obtiene todos los registros de la tabla ValidadorArchivos.
 * @returns Una lista de todos los registros.
 */
export const ObtenerTodosLosRegistros = async (): Promise<ValidadorArchivos[]> => {
  const repository = AppDataSource.getRepository(ValidadorArchivos);
  return await repository.find(); // Devuelve todos los registros
};

/**
 * Verifica si una columna existe en la base de datos.
 * @param columnName Nombre de la columna a verificar.
 * @returns `true` si la columna existe, `false` en caso contrario.
 */
export const ExisteColumna = async (columnName: string): Promise<boolean> => {
  const repository = AppDataSource.getRepository(ValidadorArchivos);
  const column = await repository.findOne({
    where: { ColumnName: columnName.toLowerCase() },
  });

  return !!column; // Retorna `true` si la columna existe, `false` si no.
};

export const VerificarColumnasLista = async (
  columns: string[]
): Promise<{ existingColumns: string[]; newColumns: string[] }> => {
  const repository = AppDataSource.getRepository(ValidadorArchivos);

  // Convertir las columnas de entrada a minúsculas
  const lowerCaseColumns = columns.map((col) => col.toLowerCase());
  console.log("LowerCase Columns:", lowerCaseColumns);

  // Realizamos la consulta usando una lista normalizada (en minúsculas)
  const existingClassifications = await repository
    .createQueryBuilder("validador")
    .where("LOWER(validador.ColumnName) IN (:...columns)", { columns: lowerCaseColumns })
    .getMany();

  console.log("Existing Classifications:", existingClassifications);

  // Convertimos las columnas encontradas a minúsculas para una comparación uniforme
  const existingColumns = existingClassifications.map((c) => c.ColumnName.toLowerCase());
  console.log("Matched Columns:", existingColumns);

  // Identificamos las columnas nuevas
  const newColumns = lowerCaseColumns.filter((col) => !existingColumns.includes(col));
  console.log("New Columns:", newColumns);

  // Devolvemos las columnas originales y las nuevas
  return {
    existingColumns: existingClassifications.map((c) => c.ColumnName),
    newColumns: columns.filter((col) => !existingColumns.includes(col.toLowerCase())),
  };
};



/**
 * Guarda nuevos datos de columnas en la base de datos.
 * @param classifications Arreglo de objetos con datos de nuevas columnas.
 */
export const NuevoDato = async (classifications: ValidadorArchivosInput[]): Promise<void> => {
  const repository = AppDataSource.getRepository(ValidadorArchivos);

  const newClassifications = classifications.map((item) =>
    repository.create({
      ColumnName: item.NombreColumna.toLowerCase(),
      Classification: item.TipoClasificacion,
      Description: item.Descripcion,
    })
  );

  await repository.save(newClassifications);
};
