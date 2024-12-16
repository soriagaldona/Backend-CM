import { validateDto } from "../middleware/validate.middleware";
import { CreateAnimalDto } from "../validators/animal.dto";
import { Request, Response, NextFunction } from "express";

describe("Middleware - validateDto", () => {
  it("should call next if validation passes", async () => {
    const req = {
      body: { IDE: "1234", IDV: "5678" },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    await validateDto(CreateAnimalDto)(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 400 if validation fails", async () => {
    const req = {
      body: { IDE: "1234" }, // IDV falta
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    await validateDto(CreateAnimalDto)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error de validación",
      details: expect.any(Array),
    });
    expect(next).not.toHaveBeenCalled();
  });
});
