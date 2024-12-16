// import { mockRepository } from "../utils/data-source";
import { findAllAnimals, createAnimal, findAnimalById } from "../repositories/animal.repository";

const { mockRepository } = jest.requireMock("../utils/data-source");

jest.mock("../utils/data-source", () => {
  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  return {
    AppDataSource: {
      getRepository: jest.fn(() => mockRepository),
    },
    mockRepository,
  };
});

// import { mockRepository } from "../utils/data-source";


describe("Animal Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of animals", async () => {
    const mockData = [{ id: 1, IDE: "123", IDV: "456" }];
    mockRepository.find.mockResolvedValue(mockData);

    const result = await findAllAnimals();

    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it("should create and save a new animal", async () => {
    const mockAnimal = { id: 1, IDE: "123", IDV: "456" };
    mockRepository.create.mockReturnValue(mockAnimal);
    mockRepository.save.mockResolvedValue(mockAnimal);

    const result = await createAnimal(mockAnimal);

    expect(mockRepository.create).toHaveBeenCalledWith(mockAnimal);
    expect(mockRepository.save).toHaveBeenCalledWith(mockAnimal);
    expect(result).toEqual(mockAnimal);
  });

  it("should return an animal by ID", async () => {
    const mockAnimal = { id: 1, IDE: "123", IDV: "456" };
    mockRepository.findOneBy.mockResolvedValue(mockAnimal);

    const result = await findAnimalById(1);

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(mockAnimal);
  });
});
