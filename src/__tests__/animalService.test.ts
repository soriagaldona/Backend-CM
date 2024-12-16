import * as repository from "../repositories/animal.repository";
import {
  getAllAnimals,
  getAnimalById,
  createNewAnimal,
  updateExistingAnimal,
  removeAnimal,
} from "../services/animalService";

jest.mock("../repositories/animal.repository");

describe("Animal Service", () => {
  const mockAnimal = { id: 1, IDE: "1234", IDV: "5678", Categoria: "Vaca", createdAt: new Date(), updatedAt: new Date() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of animals", async () => {
    jest.spyOn(repository, "findAllAnimals").mockResolvedValue([mockAnimal]);

    const result = await getAllAnimals();

    expect(result).toEqual([mockAnimal]);
    expect(repository.findAllAnimals).toHaveBeenCalledTimes(1);
  });

  it("should return an animal by ID", async () => {
    jest.spyOn(repository, "findAnimalById").mockResolvedValue(mockAnimal);

    const result = await getAnimalById(1);

    expect(result).toEqual(mockAnimal);
    expect(repository.findAnimalById).toHaveBeenCalledWith(1);
  });

  it("should throw an error if the animal is not found", async () => {
    jest.spyOn(repository, "findAnimalById").mockResolvedValue(null);

    await expect(getAnimalById(99)).rejects.toThrow("Animal con ID 99 no encontrado.");
    expect(repository.findAnimalById).toHaveBeenCalledWith(99);
  });

  it("should create a new animal", async () => {
    jest.spyOn(repository, "createAnimal").mockResolvedValue(mockAnimal);

    const animalData = { IDE: "1234", IDV: "5678", Categoria: "Vaca" };
    const result = await createNewAnimal(animalData);

    expect(result).toEqual(mockAnimal);
    expect(repository.createAnimal).toHaveBeenCalledWith(animalData);
  });

  it("should throw an error if IDE or IDV are missing", async () => {
    const invalidData = { Categoria: "Vaca" };

    await expect(createNewAnimal(invalidData)).rejects.toThrow("Los campos IDE e IDV son obligatorios.");
    expect(repository.createAnimal).not.toHaveBeenCalled();
  });

  it("should update an existing animal", async () => {
    jest.spyOn(repository, "findAnimalById").mockResolvedValue(mockAnimal);
    jest.spyOn(repository, "updateAnimal").mockResolvedValue({ ...mockAnimal, Categoria: "Toro" });

    const updatedData = { Categoria: "Toro" };
    const result = await updateExistingAnimal(1, updatedData);

    expect(result).toEqual({ ...mockAnimal, Categoria: "Toro" });
    expect(repository.updateAnimal).toHaveBeenCalledWith(1, updatedData);
  });

  it("should throw an error if the animal does not exist during update", async () => {
    jest.spyOn(repository, "findAnimalById").mockResolvedValue(null);

    const updatedData = { Categoria: "Toro" };

    await expect(updateExistingAnimal(99, updatedData)).rejects.toThrow("Animal con ID 99 no encontrado.");
    expect(repository.updateAnimal).not.toHaveBeenCalled();
  });

  it("should remove an animal by ID", async () => {
    jest.spyOn(repository, "findAnimalById").mockResolvedValue(mockAnimal);
    jest.spyOn(repository, "deleteAnimal").mockResolvedValue({ affected: 1, raw: {} });
  
    const result = await removeAnimal(1);
  
    expect(result).toEqual({ affected: 1, raw: {} });
    expect(repository.deleteAnimal).toHaveBeenCalledWith(1);
  });
  

  it("should throw an error if the animal does not exist during delete", async () => {
    jest.spyOn(repository, "findAnimalById").mockResolvedValue(null);

    await expect(removeAnimal(99)).rejects.toThrow("Animal con ID 99 no encontrado.");
    expect(repository.deleteAnimal).not.toHaveBeenCalled();
  });
});
