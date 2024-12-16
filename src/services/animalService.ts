import {
  findAllAnimals,
  findAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../repositories/animal.repository";

export const getAllAnimals = async () => {
  return await findAllAnimals();
};

export const getAnimalById = async (id: number) => {
  const animal = await findAnimalById(id);
  if (!animal) {
    throw new Error(`Animal con ID ${id} no encontrado.`);
  }
  return animal;
};

export const createNewAnimal = async (animalData: any) => {
  if (!animalData.IDE || !animalData.IDV) {
    throw new Error("Los campos IDE e IDV son obligatorios.");
  }
  return await createAnimal(animalData);
};

export const updateExistingAnimal = async (id: number, animalData: any) => {
  const animal = await findAnimalById(id);
  if (!animal) {
    throw new Error(`Animal con ID ${id} no encontrado.`);
  }
  return await updateAnimal(id, animalData);
};

export const removeAnimal = async (id: number) => {
  const animal = await findAnimalById(id);
  if (!animal) {
    throw new Error(`Animal con ID ${id} no encontrado.`);
  }
  return await deleteAnimal(id);
};
  