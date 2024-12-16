import { getAnimals } from "../controllers/animalController";
import { Request, Response } from "express";

// Mock de Servicios
jest.mock("../services/animalService", () => ({
  getAllAnimals: jest.fn(() => Promise.resolve([{ id: 1, IDE: "1234", IDV: "5678" }])),
}));

describe("Animal Controller - getAnimals", () => {
  it("should return a list of animals", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();
    await getAnimals(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, IDE: "1234", IDV: "5678" }]);
  });


});
