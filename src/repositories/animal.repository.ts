import { AppDataSource } from "../utils/data-source";
import { AnimalEntity } from "../models/animal.model";

export const animalRepository = AppDataSource.getRepository(AnimalEntity);

export const findAllAnimals = async () => {
  return await animalRepository.find();
};

export const findAnimalById = async (id: number) => {
  return await animalRepository.findOneBy({ id });
};

export const createAnimal = async (animalData: Partial<AnimalEntity>) => {
  const animal = animalRepository.create(animalData);
  return await animalRepository.save(animal);
};

export const updateAnimal = async (id: number, animalData: Partial<AnimalEntity>) => {
  await animalRepository.update(id, animalData);
  return await animalRepository.findOneBy({ id });
};

export const deleteAnimal = async (id: number) => {
  return await animalRepository.delete(id);
};
